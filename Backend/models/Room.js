const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  location: String,
  type: String,
  gender: String,
  price: Number
});

module.exports = mongoose.model("Room", roomSchema);