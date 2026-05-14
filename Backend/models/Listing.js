const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(

  {
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

    // ================= FACILITIES =================

    facilities: {

      type: [String],

      default: [],

    },

    // ================= AVAILABILITY =================

    available: {

      type: Boolean,

      default: true,

    },

  },

  { timestamps: true }

);

module.exports =
  mongoose.model(
    "Listing",
    listingSchema
  );