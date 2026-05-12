const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    password: String,
    businessType: String,
    businessName: String,
    city: String,
    address: String,
    ownerName: String,
    email: String,
    experience: String,
    about: String,
    photo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Register", registerSchema);