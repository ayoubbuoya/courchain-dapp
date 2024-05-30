import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  order: { type: Number, required: true },
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
  withAI: { type: Boolean, default: false },
  AIChatHistory: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Module =
  mongoose.models.Module || mongoose.model("Module", moduleSchema, "modules");

export default Module;
