import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: String,
  duration: String,
  level: String,
  price: {
    type: Number,
    default: 0,
  },
  tags: [String],
  image: { type: String, required: false },
  requirements: [String],
  cobjectives: [String],
  mentors: [
    { type: Schema.Types.ObjectId, ref: "User", match: { role: "mentor" } },
  ], // Multiple mentors can be assigned to a course
  modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  withAI: { type: Boolean, default: false },
  AIChatHistory: Schema.Types.Mixed,
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema, "courses");

export default Course;
