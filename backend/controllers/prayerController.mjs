import { Prayer } from "../models/prayers.mjs";

//Get all Prayers
export const getAllPrayers = async (req, res) => {
  const allPrayers = await Prayer.find();
  if (allPrayers.length === 0) {
    return res.status(404).json({
      message: "No Prayers Have been found!",
    });
  }
  return res.status(200).json(allPrayers);
};

//Get one Prayer using id
export const getOnePrayer = async (req, res) => {
  const { id } = req.params;
  try {
    const singlePrayer = await Prayer.findById(id);
    return res.status(200).json(singlePrayer);
  } catch (error) {
    return res.status(404).json({
      message: "Prayer for the id not found!",
    });
  }
};

//Create new Prayer
export const createNewPrayer = async (req, res) => {
  console.log("Entered path");
  const { prayerHeading, prayerContent } = req.body;
  if (!prayerHeading || !prayerContent) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  try {
    const files = req.files;
    const fileUrls = files.map((file) => file.path); // Cloudinary URLs
    console.log(fileUrls);
    const prayerPayload = {
      prayerHeading,
      prayerContent,
      prayerImages: fileUrls,
    };
    const newPrayer = new Prayer(prayerPayload);
    console.log(newPrayer);
    const insertedPrayer = await newPrayer.save();
    return res.status(201).json(insertedPrayer);
  } catch (error) {
    return res.status(500).json({
      message: "Error happened while saving the prayer.",
      Error: error,
    });
  }
};

//Edit a Prayer using id
export const editPrayer = async (req, res) => {
  const { id } = req.params;
  const { prayerHeading, prayerContent } = req.body;
  if (!prayerContent || !prayerHeading) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  const files = req.files;
  const fileUrls = files.map((file) => file.path); // Cloudinary URLs
  try {
    const updatedPrayer = await Prayer.findByIdAndUpdate(
      id,
      {
        prayerHeading,
        prayerContent,
        prayerImages: fileUrls,
      },
      {
        new: true,
      }
    );
    if (!updatedPrayer) {
      return res.status(404).json({
        message: "Can't able to find the prayer.",
      });
    }
    return res.status(200).json(updatedPrayer);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error updating Prayer", Error: error });
  }
};

//Delete a Prayer using id
export const deletePrayer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPrayer = await Prayer.findByIdAndDelete(id);
    if (!deletedPrayer) {
      return res.status(404).json({ message: "Prayer Not Found" });
    }
    return res.status(200).json(deletedPrayer);
  } catch (error) {
    return res.status(400).json({ message: "Error happened", Error: error });
  }
};
