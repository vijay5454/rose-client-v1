import mongoose from "mongoose";

const prayerSchema = new mongoose.Schema({
  prayerHeading: {
    type: String,
    required: true,
  },
  prayerContent: {
    type: String,
    required: true,
  },
});
