import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { Prayer } from "./models/prayers.mjs";
import { router as prayerRoutes } from "./routes/prayerRoutes.mjs";

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello buddy!",
  });
});

app.use("/", prayerRoutes);

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
