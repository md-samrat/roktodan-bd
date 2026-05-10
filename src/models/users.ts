import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "নাম আবশ্যক"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "মোবাইল নাম্বার আবশ্যক"],
    match: [/^01[3-9]\d{8}$/, "সঠিক বাংলাদেশি মোবাইল নাম্বার দিন"],
    unique: true,
    trim: true,
  },
  bloodGroup: {
    type: String,
    required: [true, "রক্তের গ্রুপ আবশ্যক"],
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  address: {
    type: String,
    required: [true, "ঠিকানা আবশ্যক"],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "লিঙ্গ নির্বাচন আবশ্যক"],
    enum: ["Male", "Female", "Other"],
  },
  lastDonationDate: {
    type: Date,
    default: null,
  },
  password: {
    type: String,
    required: [true, "পাসওয়ার্ড আবশ্যক"],
    minlength: [6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"],
  },
  profileImage: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

// Check if model already exists to avoid overwriting
const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;