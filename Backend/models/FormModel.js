const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    businessType: String,
    businessName: String,
    city: String,
    address: String,
    ownerName: String,
    experience: String,
    about: String,
    phone: String,
    whatsapp: String,
    email: String,
    photo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);