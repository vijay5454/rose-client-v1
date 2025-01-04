import {
  createNewTestimony,
  fetchAllTestimonies,
} from "../controllers/testimoniesController.mjs";
import express from "express";

export const testimoniesRouter = express.Router();

testimoniesRouter.get("/testimonies", fetchAllTestimonies);
testimoniesRouter.post("/testimonies/create", createNewTestimony);
