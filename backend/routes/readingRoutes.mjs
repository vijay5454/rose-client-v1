import {
  createNewReading,
  getTodaysReading,
} from "../controllers/readingController.mjs";
import express from "express";
import { uploadImageMiddleware } from "../utils/cloudinaryMiddleware.mjs";

export const readingRouter = express.Router();

readingRouter.get("/latest-reading", getTodaysReading);
readingRouter.post("/reading/create", uploadImageMiddleware, createNewReading);
