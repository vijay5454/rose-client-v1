import { Reading } from "../models/readings.mjs";

export async function getTodaysReading(req, res) {
  const latestReading = await Reading.findOne().sort({ createdAt: -1 });
  if (!latestReading) {
    return res.status(404).json({
      message: "Reading not found!",
    });
  }
  if (latestReading) {
    return res.status(200).json(latestReading);
  }
}

//Create new Reading
export const createNewReading = async (req, res) => {
  const { readingHeading, readingContent } = req.body;
  if (!readingHeading || !readingContent) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  try {
    const files = req.files;
    const fileUrls = files.map((file) => file.path); // Cloudinary URLs
    const readingPayload = {
      readingHeading,
      readingContent,
      readingImages: fileUrls,
    };
    const newReading = new Reading(readingPayload);
    const insertedReading = await newReading.save();
    return res.status(201).json(insertedReading);
  } catch (error) {
    return res.status(500).json({
      message: "Error happened while saving the Reading.",
      Error: error,
    });
  }
};
