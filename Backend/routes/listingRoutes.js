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
          success: false,
          message: "providerId missing ❌",
        });

      }

      const listing = new Listing({

        ...req.body,

        images,

        providerId: req.body.providerId,

        latitude: req.body.latitude,

        longitude: req.body.longitude,

      });

      await listing.save();

      res.status(201).json({

        success: true,

        message: "Listing created ✅",

        listing,

      });

    } catch (err) {

      console.log("CREATE ERROR:", err);

      res.status(500).json({

        success: false,

        message:
          err.message || "Server Error",

      });

    }

  }

);

// ================= GET ALL LISTINGS =================

router.get("/", async (req, res) => {

  try {

    const listings =
      await Listing.find();

    res.status(200).json({

      success: true,

      listings,

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

});

// ================= GET ALL LISTINGS (/all) =================

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

      success: false,

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

        success: false,

        message:
          "Latitude and Longitude required",

      });

    }

    const latitude =
      parseFloat(lat);

    const longitude =
      parseFloat(lng);

    const listings =
      await Listing.find();

    const nearbyListings =
      listings.map((item) => {

        const itemLat =
          parseFloat(item.latitude);

        const itemLng =
          parseFloat(item.longitude);

        if (!itemLat || !itemLng) {

          return {

            ...item._doc,

            distance: 999999,

          };

        }

        // ================= HAVERSINE =================

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

    // ================= SORT BY DISTANCE =================

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

      success: false,

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

// ================= GET LISTINGS BY PROVIDER =================

router.get(

  "/provider/:id",

  async (req, res) => {

    try {

      const listings =
        await Listing.find({

          providerId:
            req.params.id,

        });

      res.status(200).json({

        success: true,

        listings,

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message: err.message,

      });

    }

  }

);

// ================= GET SINGLE LISTING =================

router.get("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    if (!id || id === "undefined") {

      return res.status(400).json({

        success: false,

        message: "Invalid ID",

      });

    }

    const listing =
      await Listing.findById(id);

    if (!listing) {

      return res.status(404).json({

        success: false,

        message: "Listing not found",

      });

    }

    res.status(200).json({

      success: true,

      listing,

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

});

module.exports = router;