import {asyncHandler} from "../config/AsyncHandler.js";
import { Request, Response } from "express";
import Business from "../models/business.model.js";
import { uploadInCloudinary } from "../config/cloudinary.js";

import {ApiError} from "../config/ApiError.js";
import {ApiResponse} from "../config/ApiResponse.js";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail.js";


import ownerModel from "../models/owner.model.js";

export const createOwner = asyncHandler(async (req: Request & { file?: File }, res: Response) => {
    const { fullName, country, state, city, address, email, mobile } = req.body;
  
    // Validate required fields
    if (
      [fullName, country, state, city, address, email, mobile].some(
        (field) => !field?.trim()
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }
  
    // Handle image upload
    let imageUrl = "";
    if (req.file) {
      const result = await uploadInCloudinary(req.file.path);
      imageUrl = result.secure_url;
    }

    let ownerVerifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);
  
    // Create the business
    const owner = await ownerModel.create({
      fullName,
      country,
      state,
      city,
      address,
      email,
      mobile,
      profilePic: imageUrl,
      isOwnerVerified: false,
      ownerVerifyCodeExpiry: expiryDate,
      ownerVerifyCode,
    });
  
     // Send verification email
     const emailResponse = await sendVerificationEmail(
      fullName,
      email,
      ownerVerifyCode
    );

    if (!emailResponse.success) {
      res.status(500).json(new ApiResponse(500, emailResponse.message));
      
    }

    // Fetch the created business to ensure it was saved correctly
    const createdOwner = await ownerModel.findById(owner._id);
    if (!createdOwner) {
      throw new ApiError(500, "Something went wrong while creating the business");
    }
  
    // Return success response
    res.status(201).json(new ApiResponse(201, "Owner created successfully", createOwner));
  });

export const getOwner = asyncHandler(async (req: Request, res: Response) => {
  const owner = await ownerModel.find();
  res.status(200).json(new ApiResponse(200, "Owner retrieved successfully", owner));
});

export const getOwnerById = asyncHandler(async (req: Request, res: Response) => {
  const owner = await ownerModel.findById(req.params.id);
  if (!owner) {
    throw new ApiError(404, "Owner not found");
  }
  res.status(200).json(new ApiResponse(200, "Owner retrieved successfully", owner));
});

export const updateOwner = asyncHandler(async (req: Request, res: Response) => {
  const updatedOwner = await ownerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedOwner) {
    throw new ApiError(404, "Owner not found");
  }
  res.status(200).json(new ApiResponse(200, "Owner updated successfully", updatedOwner));
});

export const deleteOwner = asyncHandler(async (req: Request, res: Response) => {
  const deletedOwner = await Business.findByIdAndDelete(req.params.id);
  if (!deletedOwner) {
    throw new ApiError(404, "Owner not found");
  }
  res.status(200).json(new ApiResponse(200, "Owner deleted successfully"));
});


export const verifyOwnerByEmail = asyncHandler(async (req: Request, res: Response) => {

  try {
    const { fullName, code } = req.body;
    const decodedOwnerName = decodeURIComponent(fullName);

    const owner = await ownerModel.findOne({ fullName: decodedOwnerName });

    if (!owner) {
      throw new ApiError(400, "No business found");
    }

    const isCodeValid = code === owner.ownerVerifyCode;
    const isCodeNotExpired = new Date(owner.ownerVerifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      owner.isOwnerVerified = true;
      await owner.save();
      return res.status(200).json(new ApiResponse(200, "Owner verified successfully"));
    } else if (!isCodeValid) {
      throw new ApiError(401, "Incorrect Verification Code");
    } else {
      throw new ApiError(401, "Verification code expired");
    }
  } catch (error) {
    console.error("Error verifying code", error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json(new ApiResponse(500, "Error verifying code"));
  }
});
