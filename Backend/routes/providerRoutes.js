const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  registerProvider,
  loginProvider,
  googleLoginProvider,
  checkProvider,
} = require("../controllers/providerController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// REGISTER
router.post("/register", upload.single("photo"), registerProvider);

// LOGIN
router.post("/login", loginProvider);

// GOOGLE LOGIN
router.post("/google-login", googleLoginProvider);

// CHECK
router.post("/check-provider", checkProvider);

module.exports = router;