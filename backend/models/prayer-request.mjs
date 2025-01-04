import mongoose from "mongoose";

const prayerRequestSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  prayerRequest: {
    type: String,
    required: true,
  },
});

const PrayerRequest = mongoose.model("PrayerRequest", prayerRequestSchema);

export { PrayerRequest };
