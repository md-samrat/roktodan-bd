import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    match: [/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"],
    unique: true,
  },

  bloodGroup: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  // 🔥 ADD GENDER
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },

  lastDonationDate: {
    type: Date,
  },

  password: {
    type: String,
    required: true,
  },

  // 🔥 PROFILE IMAGE
  profileImage: {
    type: String,
    default: "",
  },
});

const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;