import mongoose from "mongoose";

const readingSchema = new mongoose.Schema(
  {
    readingHeading: {
      type: String,
      required: true,
    },
    readingContent: {
      type: String,
      required: true,
    },
    readingImages: {
      type: [String],
    },
  },
  { timestamps: true }
);

readingSchema.index({ readingContent: "text", readingHeading: "text" });

const Reading = mongoose.model("Reading", readingSchema);

export { Reading };
