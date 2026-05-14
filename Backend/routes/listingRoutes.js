const express = require("express");
const router = express.Router();
const multer = require("multer");

const Listing = require("../models/Listing");

// ================= MULTER =================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },

});

const upload = multer({ storage });

// ================= CREATE LISTING =================

router.post(
  "/create",
  upload.array("images", 5),

  async (req, res) => {

    try {

      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const images =
        req.files && req.files.length > 0
          ? req.files.map(
              (file) =>
                `uploads/${file.filename}`
            )
          : [];

      if (!req.body.providerId) {

        return res.status(400).json({
          message: "providerId missing ❌",
        });

      }

      const listing = new Listing({

        ...req.body,

        images,

        providerId: req.body.providerId,

        // LOCATION SAVE
        latitude: req.body.latitude,
        longitude: req.body.longitude,

      });

      await listing.save();

      res.status(201).json({
        success: true,
        message: "Listing created",
        listing,
      });

    } catch (err) {

      console.log("CREATE ERROR:", err);

      res.status(500).json({
        message:
          err.message || "Server error",
      });

    }
  }
);

// ================= GET ALL =================

router.get("/all", async (req, res) => {

  try {

    const listings =
      await Listing.find();

    res.status(200).json({
      success: true,
      listings,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
});

// ================= GET NEARBY LISTINGS =================

router.get("/near", async (req, res) => {

  try {

    const { lat, lng } = req.query;

    if (!lat || !lng) {

      return res.status(400).json({
        message:
          "Latitude and Longitude required",
      });

    }

    const latitude =
      parseFloat(lat);

    const longitude =
      parseFloat(lng);

    // ================= FETCH ALL =================

    const listings =
      await Listing.find();

    // ================= DISTANCE CALCULATION =================

    const nearbyListings =
      listings.map((item) => {

        const itemLat =
          parseFloat(item.latitude);

        const itemLng =
          parseFloat(item.longitude);

        // IF NO LOCATION

        if (!itemLat || !itemLng) {

          return {
            ...item._doc,
            distance: 999999,
          };

        }

        // ================= HAVERSINE FORMULA =================

        const R = 6371;

        const dLat =
          (itemLat - latitude) *
          (Math.PI / 180);

        const dLng =
          (itemLng - longitude) *
          (Math.PI / 180);

        const a =
          Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +

          Math.cos(
            latitude *
              (Math.PI / 180)
          ) *

            Math.cos(
              itemLat *
                (Math.PI / 180)
            ) *

            Math.sin(dLng / 2) *

            Math.sin(dLng / 2);

        const c =
          2 *
          Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
          );

        const distance = R * c;

        return {
          ...item._doc,
          distance,
        };

      });

    // ================= SORT NEAREST FIRST =================

    nearbyListings.sort(
      (a, b) =>
        a.distance - b.distance
    );

    res.status(200).json({
      success: true,
      listings: nearbyListings,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

});
// ================= UPDATE AVAILABILITY =================

router.put(

  "/availability/:id",

  async (req, res) => {

    try {

      const { available } =
        req.body;

      const updatedListing =
        await Listing.findByIdAndUpdate(

          req.params.id,

          { available },

          { new: true }

        );

      res.json({

        success: true,

        listing: updatedListing,

      });

    } catch (err) {

      res.status(500).json({

        success: false,

        message: err.message,

      });

    }

  }

);

// ================= GET BY PROVIDER =================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id === "undefined") {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      success: true,
      listing,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/provider/:id", async (req, res) => {

  try {

    const listings =
      await Listing.find({
        providerId: req.params.id,
      });

    res.status(200).json({
      success: true,
      listings,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

});


module.exports = router;