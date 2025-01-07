import {
  createNewTestimony,
  fetchAllTestimonies,
  fetchTestimonyUsingId,
} from "../controllers/testimoniesController.mjs";
import express from "express";

export const testimoniesRouter = express.Router();

testimoniesRouter.get("/testimonies", fetchAllTestimonies);
testimoniesRouter.post("/testimonies/create", createNewTestimony);
testimoniesRouter.get("/testimonies/:id", fetchTestimonyUsingId);
