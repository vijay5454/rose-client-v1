import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "Hello world",
  });
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
