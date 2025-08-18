import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    title: { type: String },
    url1: { type: String },
    url2: { type: String },
    youtube: { type: String },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },
  },
  { timestamps: true }
);

const QUESTION = mongoose.model("Question", QuestionSchema);
export default QUESTION;
