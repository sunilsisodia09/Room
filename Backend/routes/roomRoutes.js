const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// GET all rooms (with filters)
router.get("/", async (req, res) => {
  try {
    const { location, type, gender } = req.query;

    let query = {};

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (type) {
      query.type = type;
    }

    if (gender) {
      query.gender = { $in: [gender, "Any"] };
    }

    const rooms = await Room.find(query);
    res.json(rooms);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ADD room (for admin)
router.post("/", async (req, res) => {
  const room = new Room(req.body);
  const saved = await room.save();
  res.json(saved);
});

module.exports = router;