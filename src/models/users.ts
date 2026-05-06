import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bloodDonationDate: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.models.User || mongoose.model("User",UserSchema)

export default UserModel