const Provider = require("../models/Provider");
const bcrypt = require("bcryptjs");

/* ================= CHECK PROVIDER ================= */
const checkProvider = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const mobile = req.body.mobile?.trim();

    if (!email && !mobile) {
      return res.status(400).json({
        message: "Email or mobile required",
      });
    }

    const exists = await Provider.findOne({
      $or: [{ email }, { mobile }],
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Provider already exists",
      });
    }

    res.status(200).json({
      success: true,
      message: "Provider available",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= REGISTER ================= */
const registerProvider = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      city,
      address,
      businessType,
      ownerName,
      about,
    } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const exists = await Provider.findOne({
      $or: [{ email: email.toLowerCase() }, { mobile }],
    });

    if (exists) {
      return res.status(409).json({
        message: "Provider already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const provider = await Provider.create({
      name,
      email: email.toLowerCase(),
      mobile,
      password: hashedPassword,
      city,
      address,
      businessType,
      ownerName,
      about,
      photo: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      provider,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= LOGIN ================= */
const loginProvider = async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    const provider = await Provider.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      provider.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      success: true,
      provider,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GOOGLE LOGIN ================= */
const googleLoginProvider = async (req, res) => {
  try {
    const { name, email, photo } = req.body;

    let provider = await Provider.findOne({
      email: email.toLowerCase(),
    });

    if (!provider) {
      provider = await Provider.create({
        name,
        email: email.toLowerCase(),
        photo,
        password: "google-auth",
      });
    }

    res.status(200).json({
      success: true,
      provider,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  checkProvider,
  registerProvider,
  loginProvider,
  googleLoginProvider,
};