import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { Prayer } from "./models/prayers.mjs";

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello buddy!",
  });
});

//Get all Prayers
app.get("/prayers", async (req, res) => {
  const allPrayers = await Prayer.find();
  if (allPrayers.length === 0) {
    return res.status(404).json({
      message: "No Prayers Have been found!",
    });
  }
  return res.status(200).json(allPrayers);
});

//Get one Prayer
app.get("/prayers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singlePrayer = await Prayer.findById(id);
    return res.status(200).json(singlePrayer);
  } catch (error) {
    return res.status(404).json({
      message: "Prayer for the id not found!",
    });
  }
});

//Create one Prayer
app.post("/prayers", async (req, res) => {
  const newPrayer = new Prayer({ ...req.body });
  console.log(newPrayer);
  const insertedPrayer = await newPrayer.save();
  return res.status(201).json(insertedPrayer);
});

//Update one Prayer
app.put("/prayers/:id", async (req, res) => {
  const { id } = req.params;
  const { prayerHeading, prayerContent } = req.body;
  try {
    const updatedPrayer = await Prayer.findByIdAndUpdate(
      id,
      {
        prayerHeading,
        prayerContent,
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
});
//Delete One Prayer
app.delete("/prayers/:id", async (req, res) => {
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
});

const serverStart = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log(mongoose.connection.readyState);
    app.listen(port, () => {
      console.log("Listening from port" + port);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

serverStart();
