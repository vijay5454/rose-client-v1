import mongoose from "mongoose";

const testimoniesSchema = new mongoose.Schema(
  {
    testimoniesHeading: {
      type: String,
      required: true,
    },
    testimoniesContent: {
      type: String,
    },
    testimoniesURL: {
      type: [String],
    },
  },
  { timestamps: true }
);

testimoniesSchema.index({
  testimoniesHeading: "text",
  testimoniesContent: "text",
});

const Testimonies = mongoose.model("Testimonies", testimoniesSchema);

export { Testimonies };
