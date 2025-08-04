// Utility for handling Cloudinary uploads in the project
// -----------------------------------------------------
// This file sets up and exports a helper function to upload files to Cloudinary.
// Cloudinary is a cloud-based service for managing images and videos, providing storage,
// transformation, and delivery. We use it to offload media storage from our server,
// enabling scalable and efficient media handling.
//
// The configuration uses environment variables for security and flexibility.
// The exported function can be used throughout the project to upload files to Cloudinary.

import { v2 as cloudinary } from 'cloudinary';
// Note: 'fs' is used for file system operations (removing temp files on error)
import fs from 'fs';

// Configuration: Set up Cloudinary credentials from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET  // Your Cloudinary API secret
});

// uploadOnCloudinary: Uploads a local file to Cloudinary
// @param {string} localFilePath - Path to the local file to upload
// @returns {object|null} - Cloudinary response object if successful, or null if failed
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null // No file path provided
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            // resource_type: 'auto' allows images, videos, etc.
            resource_type: 'auto',
        })

        // File uploaded successfully
        console.log("file has uploaded successfully", response.url);
        return response;
    } catch (error) {
        // On error, remove the local temp file to avoid clutter
        fs.unlinkSync(localFilePath)
        return null;
    }
}

// Export the upload function for use in other modules
export { uploadOnCloudinary };