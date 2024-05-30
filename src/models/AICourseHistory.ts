import mongoose, { Schema } from "mongoose";

const AICourseHistorySchema = new Schema({
  course_id: {
    type: Number,
    required: true,
  },
  mentor_id: {
    type: String,
    required: true,
  },
  chatHistory: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const AICourseHistory = mongoose.models.AICourseHistory || mongoose.model("AICourseHistory", AICourseHistorySchema, "aicoursehistories");

export default AICourseHistory;