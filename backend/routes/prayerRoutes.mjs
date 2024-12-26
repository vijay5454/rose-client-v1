import express from "express";
import {
  createNewPrayer,
  deletePrayer,
  editPrayer,
  getAllPrayers,
  getOnePrayer,
  searchPrayer,
} from "../controllers/prayerController.mjs";
import { uploadImageMiddleware } from "../utils/cloudinaryMiddleware.mjs";

export const prayerRouter = express.Router();

prayerRouter.get("/prayers", getAllPrayers);
prayerRouter.get("/prayers/:id", getOnePrayer);
prayerRouter.post("/prayers", uploadImageMiddleware, createNewPrayer);
prayerRouter.put("/prayers/:id", uploadImageMiddleware, editPrayer);
prayerRouter.delete("/prayers/:id", deletePrayer);
prayerRouter.get("/prayer-search", searchPrayer);
