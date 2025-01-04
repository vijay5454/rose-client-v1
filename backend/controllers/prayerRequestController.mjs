import { PrayerRequest } from "../models/prayer-request.mjs";

export async function getAllPrayerRequest(req, res) {
  try {
    const prayerRequestList = await PrayerRequest.find();
    if (prayerRequestList.length === 0) {
      return res.status(404).json({
        message: "No Prayer Request Found!",
      });
    }
    return res.status(200).json(prayerRequestList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error happened while fetching prayer request.",
    });
  }
}

export async function createNewPrayerRequest(req, res) {
  const { name, email, prayerRequest } = req.body;
  if (!email || !prayerRequest) {
    return res.status(400).json({
      message: "Please provide necessary details!",
    });
  }
  const prayerRequestPayload = {
    name,
    email,
    prayerRequest,
  };
  const newPrayerRequest = new PrayerRequest(prayerRequestPayload);
  try {
    const insertedPrayerRequest = await newPrayerRequest.save();
    if (insertedPrayerRequest) {
      return res.status(200).json(insertedPrayerRequest);
    }
    return res.status(500).json({
      message: "Error happened while saving the given prayer request.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error happened while saving the given prayer request.",
    });
  }
}
