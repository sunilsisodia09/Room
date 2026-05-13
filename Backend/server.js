require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= UPLOADS FOLDER =================
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}


app.use(
  cors({
    origin: [
      "https://roomhai-kappa.vercel.app",
      "https://roomhai.netlify.app"
    ],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================
const userRoutes = require("./routes/userRoutes");
const providerRoutes = require("./routes/providerRoutes");
const listingRoutes = require("./routes/listingRoutes");

app.use("/api/users", userRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/listings", listingRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ================= MONGODB CONNECTION =================
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 10000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed ❌", err);
    process.exit(1);
  });