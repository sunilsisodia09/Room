// AddListing.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AddListing.css";

export default function AddListing() {

  const navigate = useNavigate();

  const provider = JSON.parse(
    localStorage.getItem("provider")
  );

  const facilitiesList = [
    "WiFi",
        "Housekeeping available",
            "Food Service Included",
                "Private Garden",
                    "On-Call Maintenance Staff",
                        "Pet Friendly",
    "Sofa",
    "AC",
    "Food",
    "Laundry",
    "Power Backup",
    "Parking",
    "CCTV",
    "Gym",
    "2Bed",
    "Furnished",
    "Semi-Furnished",
    "TV",
    "Attached Bathroom",
  ];

  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    price: "",
    address: "",
    city: "",
    pincode: "",
    type: "",
    gender: "",
    whatsapp: "",
    phone: "", // ✅ CALL ADD
    availability: "Available",
    images: [],
    providerId: provider?._id,
  });

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setForm({
        ...form,
        images: [...files],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // ================= FACILITIES =================

  const toggleFacility = (facility) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(
        selectedFacilities.filter((f) => f !== facility)
      );
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  // ================= SUBMIT =================

  const handleSubmit = async () => {
    const data = new FormData();

    Object.keys(form).forEach((key) => {
      if (key === "images") {
        form.images.forEach((img) => data.append("images", img));
      } else {
        data.append(key, form[key]);
      }
    });

    selectedFacilities.forEach((f) => {
      data.append("facilities", f);
    });

    try {
      const res = await fetch(
        "http://localhost:5000/api/listings/create",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      alert("Listing Created Successfully");

      navigate("/Providerdashboard");

    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="listing-page">

      <div className="listing-form">

        {/* ROOM DETAILS */}
        <div className="listing-section">

          <h2>Room Details</h2>

          <div className="full-width">
            <label>Room / PG / Flat / Hostel Name *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Sunrise PG for Boys"
              onChange={handleChange}
            />
          </div>

          <div className="listing-grid-2">

            <div>
              <label>City *</label>
              <select name="city" onChange={handleChange}>
                <option value="">Select city</option>
                <option value="Dehradun">Dehradun</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>

            <div>
              <label>Pin Code</label>
              <input
                type="text"
                name="pincode"
                placeholder="e.g. 201301"
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="listing-grid-2">

            <div>
              <label>Location / Area</label>
              <input
                type="text"
                name="address"
                placeholder="e.g. Sector 62"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Price per Month (₹) *</label>
              <input
                type="text"
                name="price"
                placeholder="e.g. 8500"
                onChange={handleChange}
              />
            </div>

          </div>

          {/* TYPE + GENDER */}
          <div className="listing-grid-2">

            <div>
              <label>Property Type *</label>
              <select name="type" onChange={handleChange}>
                <option value="">Select type</option>
                <option value="PG">PG</option>
                <option value="Hostel">Hostel</option>
                <option value="Room">Room</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            <div>
              <label>Gender</label>
              <select name="gender" onChange={handleChange}>
                <option value="">Select gender</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

          </div>

          {/* CONTACT */}
          <div className="listing-grid-2">

            <div>
              <label>WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                placeholder="WhatsApp number"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Call Add (Phone Number)</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter contact number"
                onChange={handleChange}
              />
            </div>

          </div>

          {/* FACILITIES */}
          <div className="facility-section">

            <label>Facilities</label>

            <div className="facility-list">

              {facilitiesList.map((facility) => (
                <button
                  type="button"
                  key={facility}
                  className={
                    selectedFacilities.includes(facility)
                      ? "facility-btn active-facility"
                      : "facility-btn"
                  }
                  onClick={() => toggleFacility(facility)}
                >
                  {facility}
                </button>
              ))}

            </div>

          </div>

          {/* IMAGE */}
          <div className="upload-box">

            <label>Upload Images *</label>

            <input
              type="file"
              multiple
              name="images"
              onChange={handleChange}
            />

          </div>

        </div>

        {/* SUBMIT */}
        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit Listing for Review
        </button>

      </div>

    </div>
  );
}