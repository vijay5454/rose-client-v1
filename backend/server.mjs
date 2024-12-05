import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { Prayer } from "./models/prayers.mjs";

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());

app.get("/prayers", async (req, res) => {
  const allPrayers = await Prayer.find();
  res.status(200).json(allPrayers);
});

app.get("/prayers/:id", async (req, res) => {
  const { id } = req.params;
  const singlePrayer = await Prayer.findById(id);
  res.status(200).json(singlePrayer);
});

app.post("/prayers", async (req, res) => {
  const newPrayer = new Prayer({ ...req.body });
  console.log(newPrayer);
  const insertedPrayer = await newPrayer.save();
  return res.status(201).json(insertedPrayer);
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
