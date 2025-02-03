import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadInCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        //Upload file in cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: "auto"
            }
        )
        // File uploaded successfully
        fs.unlinkSync(localFilePath)    // Reamove the locally saved temporary file as the upload operation is succeed
        // console.log("File uploaded successfully", response);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)  // Reamove the locally saved temporary file as the upload operation failed
        throw error
    }
}


export {uploadInCloudinary}