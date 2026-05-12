const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
    password: String,

    businessType: String,
    city: String,
    address: String,
    ownerName: String,
    about: String,

    photo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Provider", providerSchema);