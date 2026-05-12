// ================= routes/authRoutes.js =================

const express = require("express");

const router = express.Router();

const multer = require("multer");

const fs = require("fs");

const path = require("path");

const User = require("../models/User");

const {
  registerProvider,
  loginProvider,
  getProviderById,
} = require("../controllers/providerController");

// ================= UPLOAD FOLDER =================

const uploadDir = path.join(
  __dirname,
  "../uploads"
);

if (!fs.existsSync(uploadDir)) {

  fs.mkdirSync(uploadDir);

}

// ================= MULTER =================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadDir);

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );

  },

});

const upload = multer({
  storage,
});

// =====================================================
// ================= CHECK PROVIDER ====================
// =====================================================

router.post(
  "/check-provider",

  async (req, res) => {

    try {

      const {
        email,
        mobile,
      } = req.body;

      // ================= CHECK EMAIL =================

      const existingEmail =
        await User.findOne({
          email,
        });

      if (existingEmail) {

        return res.status(400).json({

          success: false,

          message:
            "Email already registered",

        });

      }

      // ================= CHECK MOBILE =================

      const existingMobile =
        await User.findOne({
          mobile,
        });

      if (existingMobile) {

        return res.status(400).json({

          success: false,

          message:
            "Mobile already registered",

        });

      }

      // ================= SUCCESS =================

      res.status(200).json({

        success: true,

        message:
          "Provider can register",

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  }
);

// =====================================================
// ================= REGISTER ==========================
// =====================================================

router.post(
  "/register",

  upload.single("photo"),

  registerProvider
);

// =====================================================
// ================= LOGIN =============================
// =====================================================

router.post(
  "/login",

  loginProvider
);

// =====================================================
// ================= GET PROVIDER ======================
// =====================================================

router.get(
  "/:id",

  getProviderById
);

module.exports = router;