// Rooms.jsx
import { getAllListings } from "../api/api";


import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Rooms.css";

const Rooms = () => {

  const [rooms, setRooms] =
    useState([]);

  const [filteredRooms,
    setFilteredRooms] =
    useState([]);

  const navigate =
    useNavigate();

  const locationHook =
    useLocation();

  // ================= QUERY =================

  const query =
    new URLSearchParams(
      locationHook.search
    );

  const location =
    (query.get("location") || "")
      .trim()
      .toLowerCase();

  const type =
    (query.get("type") || "")
      .trim()
      .toLowerCase();

  const gender =
    (query.get("gender") || "")
      .trim()
      .toLowerCase();

  // ================= FETCH =================

  useEffect(() => {

    const fetchRooms = async () => {

      try {

        const res = await fetch(
          "/api/listings/all"
        );

        const data =
          await res.json();

        console.log(
          "API DATA =>",
          data
        );

        const list =
          Array.isArray(data)
            ? data
            : data.listings || [];

        setRooms(list);

      } catch (err) {

        console.log(err);

      }

    };

    fetchRooms();

  }, []);

// ================= FILTER =================

useEffect(() => {

  let filtered = [...rooms];

  // LOCATION

  if (location) {

    filtered = filtered.filter((item) => {

      const roomLocation =
        (
          item.city ||
          item.location ||
          item.address ||
          item.area ||
          item.place ||
          ""
        )
          .toString()
          .toLowerCase();

      return roomLocation.includes(
        location.toLowerCase()
      );

    });

  }

  // TYPE

  if (type) {

    filtered = filtered.filter((item) => {

      const roomType =
        (
          item.type ||
          item.businessType ||
          item.category ||
          ""
        )
          .toString()
          .toLowerCase();

      return roomType.includes(
        type.toLowerCase()
      );

    });

  }

  // GENDER

  if (
    gender &&
    gender !== "any"
  ) {

    filtered = filtered.filter((item) => {

      const roomGender =
        (
          item.gender ||
          item.preferredGender ||
          item.genderType ||
          ""
        )
          .toString()
          .toLowerCase();

      return roomGender.includes(
        gender.toLowerCase()
      );

    });

  }

  console.log(
    "FILTERED =>",
    filtered
  );

  setFilteredRooms(filtered);

}, [
  rooms,
  location,
  type,
  gender,
]);

  return (

    <div className="rooms-container">

      {/* TITLE */}

      <h2 className="rooms-title">

        Discover Best Living Place Near You 📍

      </h2>

      {/* GRID */}

      <div className="rooms-grid">

        {filteredRooms.length > 0 ? (

          filteredRooms.map((room) => {

            const address =
              room.address ||
              room.city ||
              room.location ||
              "";

            // ================= IMAGE =================

            const images =
              Array.isArray(room.images)
                ? room.images
                : [];

            let rawImage =
              images.length > 0
                ? images[0]
                : "";

            rawImage =
              rawImage.replace(
                /\\/g,
                "/"
              );

            if (
              rawImage &&
              !rawImage.startsWith(
                "uploads/"
              )
            ) {

              rawImage =
                `uploads/${rawImage}`;

            }

            const imageUrl =
              rawImage
                ? `/${rawImage}`
                : "https://via.placeholder.com/400x250";

            return (

              <div
                key={room._id}
                className="room-card"
              >

                {/* IMAGE */}

                <div className="room-image-wrapper">

                  <img
                    src={imageUrl}
                    alt="room"
                    className="room-image"
                  />

                  {/* TYPE */}

                  <span className="room-type">

                    {room.type || "PG"}

                  </span>

                  {/* GENDER */}

                  <span className="room-gender">

                    {room.gender || "Any"}

                  </span>

                </div>

                {/* CONTENT */}

                <div className="room-content">

                  <h3 className="room-name">

                    {room.title ||
                      "2 Person Room"}

                  </h3>

                  <p className="room-location">

                    <FaMapMarkerAlt />

                    {address ||
                      "Location"}

                  </p>

                  <div className="room-price">

                    ₹{room.price || "4500"}

                    <span>/month</span>

                  </div>

                  {/* BUTTON */}

                  <button
                    className="suni"
                    onClick={() =>
                      navigate(
                        `/RoomDetails/${room._id}`
                      )
                    }
                  >

                    View All

                  </button>

                </div>

              </div>

            );

          })

        ) : (

          <div className="no-rooms">

            No Rooms Found 😔

          </div>

        )}

      </div>

    </div>

  );

};

export default Rooms;