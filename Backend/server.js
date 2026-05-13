require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Uploads Folder
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

app.use("/uploads", express.static("uploads"));

// Routes
const userRoutes = require("./routes/userRoutes");
const providerRoutes = require("./routes/providerRoutes");
const listingRoutes = require("./routes/listingRoutes");

app.use("/api/users", userRoutes);

app.use("/api/providers", providerRoutes);

app.use("/api/listings", listingRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });