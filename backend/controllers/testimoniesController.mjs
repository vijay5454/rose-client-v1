import { Testimonies } from "../models/testimonies.mjs";

export async function fetchAllTestimonies(req, res) {
  const allTestimonies = await Testimonies.find();
  if (allTestimonies.length === 0) {
    return res.status(404).json({
      message: "No testimonies found!",
    });
  }
  return res.status(200).json(allTestimonies);
}

export async function createNewTestimony(req, res) {
  const { testimoniesHeading, testimoniesContent, testimoniesURL } = req.body;
  if (!testimoniesHeading) {
    return res.status(400).json({
      message: "Please provide all information to proceed.",
    });
  }
  const testimoniesPayload = {
    testimoniesContent,
    testimoniesHeading,
    testimoniesURL,
  };
  const newTestimony = new Testimonies(testimoniesPayload);
  try {
    const insertedTestimony = await newTestimony.save();
    return res.status(200).json(insertedTestimony);
  } catch (error) {
    return res.status(500).json({
      message: "Error happened while saving the new testimony.",
    });
  }
}

export async function fetchTestimonyUsingId(req, res) {
  const { id } = req.params;
  try {
    const singleTestimony = await Testimonies.findById(id);
    return res.status(200).json(singleTestimony);
  } catch (error) {
    return res.status(404).json({
      message: "Testimony for the id not found!",
    });
  }
}
