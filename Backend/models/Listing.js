const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  price: String,
  address: String,
  city: String,
  type: String,
  gender: String,
  whatsapp: String,
  phone: String,
  location: String,
  images: [String],
  providerId: String,

  // 🔥 ADD THIS
  facilities: {
    type: [String],
    default: []
  }

}, { timestamps: true });

module.exports = mongoose.model("Listing", listingSchema);