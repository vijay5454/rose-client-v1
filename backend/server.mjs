import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { prayerRouter } from "./routes/prayerRoutes.mjs";
import { readingRouter } from "./routes/readingRoutes.mjs";
import { testimoniesRouter } from "./routes/testimoniesRoutes.mjs";
import { prayerRequestRouter } from "./routes/prayerRequestRoutes.mjs";

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello buddy!",
  });
});

app.use("/", prayerRouter);
app.use("/", readingRouter);
app.use("/", testimoniesRouter);
app.use("/", prayerRequestRouter);

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
