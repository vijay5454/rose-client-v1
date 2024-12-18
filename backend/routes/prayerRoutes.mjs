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

export const router = express.Router();

router.get("/prayers", getAllPrayers);
router.get("/prayers/:id", getOnePrayer);
router.post("/prayers", uploadImageMiddleware, createNewPrayer);
router.put("/prayers/:id", uploadImageMiddleware, editPrayer);
router.delete("/prayers/:id", deletePrayer);
router.get("/search", searchPrayer);
