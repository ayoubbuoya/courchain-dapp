import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  video: { type: String, required: false },
  text: { type: String, required: false },
  order: { type: Number, required: true },
  withAI: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Lesson =
  mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema, "lessons");

export default Lesson;
