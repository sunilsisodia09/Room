const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  googleLogin,
} = require("../controllers/userController");

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// GOOGLE LOGIN
router.post("/google-login", googleLogin);

module.exports = router;