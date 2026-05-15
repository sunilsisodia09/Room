require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= UPLOADS FOLDER =================
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}




app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================
const userRoutes = require("./routes/userRoutes");
const providerRoutes = require("./routes/providerRoutes");
const listingRoutes = require("./routes/listingRoutes");

app.use("/api/users", userRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/listings", listingRoutes);

// =============== FRONTEND ===============
const frontendDist = path.join(__dirname, "..", "Frontend", "dist");
if (fs.existsSync(frontendDist)) {
app.use(express.static(frontendDist));
app.get(/^(?!\/api\/|\/uploads\/).*/, (req, res) => {
res.sendFile(path.join(frontendDist, "index.html"));
});
} else {
app.get("/", (req, res) => res.send("Backend Running (no frontend build)"));
}


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