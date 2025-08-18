import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question", 
      },
    ],
  },
  { timestamps: true }
);

const CATEGORY = mongoose.model("Category", categorySchema);

export default CATEGORY;
