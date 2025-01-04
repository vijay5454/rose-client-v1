import {
  getAllPrayerRequest,
  createNewPrayerRequest,
} from "../controllers/prayerRequestController.mjs";
import express from "express";

export const prayerRequestRouter = express.Router();

prayerRequestRouter.get("/prayer-requests", getAllPrayerRequest);
prayerRequestRouter.post("/prayer-requests/create", createNewPrayerRequest);
