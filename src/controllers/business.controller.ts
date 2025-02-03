import {asyncHandler} from "../config/AsyncHandler.js";
import { Request, Response } from "express";
import Business from "../models/business.model.js";
import { uploadInCloudinary } from "../config/cloudinary.js";

import {ApiError} from "../config/ApiError.js";
import {ApiResponse} from "../config/ApiResponse.js";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail.js";
import { verificationCodeSchema } from "../schemas/verificationCode.schema.js";
import businessModel from "../models/business.model.js";

export const createBusiness = asyncHandler(async (req: Request & { file?: File }, res: Response) => {
    const { businessName, country, state, city, address, openingTime, closingTime, email, mobile } = req.body;
  
    // Validate required fields
    if (
      [businessName, country, state, city, address, openingTime, closingTime, email, mobile].some(
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

    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);
  
    // Create the business
    const business = await Business.create({
      businessName,
      country,
      state,
      city,
      address,
      openingTime,
      closingTime,
      email,
      mobile,
      image: imageUrl,
      isVerified: false,
      verifyCodeExpiry: expiryDate,
      verifyCode,
    });
  
     // Send verification email
     const emailResponse = await sendVerificationEmail(
      businessName,
      email,
      verifyCode
    );

    if (!emailResponse.success) {
      res.status(500).json(new ApiResponse(500, emailResponse.message));
      
    }

    // Fetch the created business to ensure it was saved correctly
    const createdBusiness = await Business.findById(business._id);
    if (!createdBusiness) {
      throw new ApiError(500, "Something went wrong while creating the business");
    }
  
    // Return success response
    res.status(201).json(new ApiResponse(201, "Business created successfully", createdBusiness));
  });

export const getBusinesses = asyncHandler(async (req: Request, res: Response) => {
  const businesses = await Business.find();
  res.status(200).json(new ApiResponse(200, "Businesses retrieved successfully", businesses));
});

export const getBusinessById = asyncHandler(async (req: Request, res: Response) => {
  const business = await Business.findById(req.params.id);
  if (!business) {
    throw new ApiError(404, "Business not found");
  }
  res.status(200).json(new ApiResponse(200, "Business retrieved successfully", business));
});

export const updateBusiness = asyncHandler(async (req: Request, res: Response) => {
  const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedBusiness) {
    throw new ApiError(404, "Business not found");
  }
  res.status(200).json(new ApiResponse(200, "Business updated successfully", updatedBusiness));
});

export const deleteBusiness = asyncHandler(async (req: Request, res: Response) => {
  const deletedBusiness = await Business.findByIdAndDelete(req.params.id);
  if (!deletedBusiness) {
    throw new ApiError(404, "Business not found");
  }
  res.status(200).json(new ApiResponse(200, "Business deleted successfully"));
});


export const verifyBusiness = asyncHandler(async (req: Request, res: Response) => {

  try {
    const { businessName, code } = req.body;
    const decodedBusinessName = decodeURIComponent(businessName);

    // const result = verificationCodeSchema.safeParse({ code });

    // if (!result.success) {
    //   const verifyErrors = result.error.format().code?._errors || [];
    //   throw new ApiError(401, verifyErrors.length > 0 ? verifyErrors.join(", ") : "Invalid verification code");
    // }

    const business = await businessModel.findOne({ businessName: decodedBusinessName });

    if (!business) {
      throw new ApiError(400, "No business found");
    }

    const isCodeValid = code === business.verifyCode;
    const isCodeNotExpired = new Date(business.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      business.isVerified = true;
      await business.save();
      return res.status(200).json(new ApiResponse(200, "Business verified successfully"));
    } else if (!isCodeValid) {
      throw new ApiError(401, "Incorrect Verification Code");
    } else {
      throw new ApiError(401, "Verification code expired, please sign up again to get a new code");
    }
  } catch (error) {
    console.error("Error verifying code", error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json(new ApiResponse(500, "Error verifying code"));
  }
});
