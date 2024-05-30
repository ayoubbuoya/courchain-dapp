import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, default: "" }, // Optional for mentors
  skills: [{ type: String }], // Optional for mentors
  certifications: [{ type: String }], // Optional for mentors
  education: [{ type: String }], // Optional for mentors
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
  picture: { type: String, default: "/default-student.png" },
  byGoogle: { type: Boolean, default: false },
  password: { type: String, required: false },
  phone: { type: String, default: "" }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User =
  mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;
