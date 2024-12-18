import express from "express";
import {
  createNewPrayer,
  deletePrayer,
  editPrayer,
  getAllPrayers,
  getOnePrayer,
  searchPrayer,
} from "../controllers/prayerController.mjs";
import { uploadMiddleware } from "../utils/cloudinaryMiddleware.mjs";

export const router = express.Router();

router.get("/prayers", getAllPrayers);
router.get("/prayers/:id", getOnePrayer);
router.post("/prayers", uploadMiddleware, createNewPrayer);
router.put("/prayers/:id", uploadMiddleware, editPrayer);
router.delete("/prayers/:id", deletePrayer);
router.get("/search", searchPrayer);
