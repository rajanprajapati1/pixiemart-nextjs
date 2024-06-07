import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 15,
    required: true,
  },
  email: {
    type: String,
    min: 3,
    max: 15,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    min: 3,
    max: 18,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profilePicture: {
    type: String,
    default: "default_profile_picture_url",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.models.user || mongoose.model("user", UserSchema);
