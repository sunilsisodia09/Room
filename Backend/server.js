const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();




app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));




if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}




app.use("/uploads", express.static("uploads"));



const userRoutes = require("./routes/userRoutes");
const providerRoutes = require("./routes/providerRoutes");
const listingRoutes = require("./routes/listingRoutes");




app.use("/api/users", userRoutes);

app.use("/api/providers", providerRoutes);

app.use("/api/listings", listingRoutes);




app.get("/", (req, res) => {
  res.send("Backend Running ");
});




mongoose
  .connect("mongodb://127.0.0.1:27017/pgfinder")
  .then(() => {

    console.log("MongoDB Connected ");

    app.listen(5000, () => {
      console.log("Server Running http://localhost:5000");
    });

  })
  .catch((err) => {
    console.log(err);
  });