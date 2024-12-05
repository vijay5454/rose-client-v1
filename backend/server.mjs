import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { Prayer } from "./models/prayers.mjs";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/prayers", async (req, res) => {
  const allPrayers = await Prayer.find();
  res.status(200).json(allPrayers);
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
    app.listen(8012, () => {
      console.log("Listening from port 8012");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

serverStart();
