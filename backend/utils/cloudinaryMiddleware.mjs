import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "prayer-uploads", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file formats
    transformation: [
      {
        quality: "auto",
      },
    ],
  },
});

const upload = multer({ storage }).array("images", 10); // Middleware for handling multiple files

// Enhanced Middleware to Handle Errors Gracefully
export const uploadMiddleware = async (req, res, next) => {
  try {
    // Wrap Multer's upload function in a promise to handle errors
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          reject(err); // Forward any Multer-specific errors
        } else {
          resolve();
        }
      });
    });

    // If successful, proceed to the next middleware or controller
    next();
  } catch (error) {
    // Catch and handle errors
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      // Multer-specific error for unexpected file field
      return res.status(400).json({
        error: "Too many files uploaded or invalid file field",
        details: error.message,
      });
    }

    // Handle other types of errors
    res.status(500).json({
      error: "File upload failed",
      details: error.message || "An unexpected error occurred",
    });
  }
};
