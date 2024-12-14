import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { Prayer } from "./models/prayers.mjs";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());

app.use(express.json());

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
  },
});

const upload = multer({ storage }).array("images", 10); // Middleware for handling multiple files

// Enhanced Middleware to Handle Errors Gracefully
const uploadMiddleware = async (req, res, next) => {
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

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello buddy!",
  });
});

//Get all Prayers
app.get("/prayers", async (req, res) => {
  const allPrayers = await Prayer.find();
  if (allPrayers.length === 0) {
    return res.status(404).json({
      message: "No Prayers Have been found!",
    });
  }
  return res.status(200).json(allPrayers);
});

//Get one Prayer
app.get("/prayers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singlePrayer = await Prayer.findById(id);
    return res.status(200).json(singlePrayer);
  } catch (error) {
    return res.status(404).json({
      message: "Prayer for the id not found!",
    });
  }
});

//Create one Prayer
app.post("/prayers", uploadMiddleware, async (req, res) => {
  console.log("Entered path");
  const { prayerHeading, prayerContent } = req.body;
  if (!prayerHeading || !prayerContent) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  try {
    const files = req.files;
    const fileUrls = files.map((file) => file.path); // Cloudinary URLs
    console.log(fileUrls);
    const prayerPayload = {
      prayerHeading,
      prayerContent,
      prayerImages: fileUrls,
    };
    const newPrayer = new Prayer(prayerPayload);
    console.log(newPrayer);
    const insertedPrayer = await newPrayer.save();
    return res.status(201).json(insertedPrayer);
  } catch (error) {
    return res.status(500).json({
      message: "Error happened while saving the prayer.",
      Error: error,
    });
  }
});

//Update one Prayer
app.put("/prayers/:id", async (req, res) => {
  const { id } = req.params;
  const { prayerHeading, prayerContent } = req.body;
  try {
    const updatedPrayer = await Prayer.findByIdAndUpdate(
      id,
      {
        prayerHeading,
        prayerContent,
      },
      {
        new: true,
      }
    );
    if (!updatedPrayer) {
      return res.status(404).json({
        message: "Can't able to find the prayer.",
      });
    }
    return res.status(200).json(updatedPrayer);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error updating Prayer", Error: error });
  }
});
//Delete One Prayer
app.delete("/prayers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPrayer = await Prayer.findByIdAndDelete(id);
    if (!deletedPrayer) {
      return res.status(404).json({ message: "Prayer Not Found" });
    }
    return res.status(200).json(deletedPrayer);
  } catch (error) {
    return res.status(400).json({ message: "Error happened", Error: error });
  }
});

const serverStart = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log(mongoose.connection.readyState);
    app.listen(port, () => {
      console.log("Listening from port" + port);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

serverStart();
