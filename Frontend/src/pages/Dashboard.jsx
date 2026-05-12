// Dashboard.jsx

import React, { useEffect, useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Dashboard.css";

const Dashboard = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const [data, setData] = useState([]);

  const [filter, setFilter] =
    useState("All");

  const [filterType, setFilterType] =
    useState("");

  const [activeIndex, setActiveIndex] =
    useState({});

  // ================= FETCH DATA =================

  useEffect(() => {

    const params =
      new URLSearchParams(
        location.search
      );

    const type =
      params.get("type");

    if (type) {
      setFilterType(type);
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        async (position) => {

          const lat =
            position.coords.latitude;

          const lng =
            position.coords.longitude;

          try {

            const res = await fetch(
              `http://localhost:5000/api/listings/near?lat=${lat}&lng=${lng}`
            );

            const result =
              await res.json();

            setData(
              Array.isArray(result)
                ? result
                : result.listings || []
            );

          } catch (err) {

            console.log(err);

            fetchAll();

          }

        },

        () => fetchAll()

      );

    } else {

      fetchAll();

    }

  }, [location.search]);

  // ================= FETCH ALL =================

  const fetchAll = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/listings/all"
      );

      const result =
        await res.json();

      setData(
        Array.isArray(result)
          ? result
          : result.listings || []
      );

    } catch (err) {

      console.log(err);

    }

  };

  // ================= AUTO IMAGE SLIDER =================

  useEffect(() => {

    const interval =
      setInterval(() => {

        setActiveIndex((prev) => {

          const updated = {
            ...prev,
          };

          data.forEach((item) => {

            const count =
              item.images?.length || 0;

            if (count > 1) {

              updated[item._id] =
                (
                  (prev[item._id] || 0) + 1
                ) % count;

            }

          });

          return updated;

        });

      }, 2500);

    return () =>
      clearInterval(interval);

  }, [data]);

  // ================= FILTER =================

  const filteredData =
    data.filter((item) => {

      const uiFilter =
        filter === "All" ||
        item.type
          ?.toLowerCase() ===
          filter.toLowerCase();

      const urlFilter =
        !filterType ||
        item.type
          ?.toLowerCase()
          .includes(
            filterType.toLowerCase()
          );

      return uiFilter && urlFilter;

    });

  return (

    <div className="db-page">

      {/* ================= HEADER ================= */}

      <div className="db-header">

        <div>

          <h2 className="db-title">
            Featured Rooms
          </h2>

          <p className="db-subtitle">
            Find best PG, Hostel &
            Rooms near you
          </p>

        </div>

      </div>

      {/* ================= FILTERS ================= */}

      <div className="db-filters">

        {[
          "All",
          "PG",
          "Hostel",
          "Room",
          "Flat",
        ].map((f) => (

          <button
            key={f}
            className={
              filter === f
                ? "db-filter-btn db-active-filter"
                : "db-filter-btn"
            }
            onClick={() =>
              setFilter(f)
            }
          >

            {f}

          </button>

        ))}

      </div>

      {/* ================= GRID ================= */}

      <div className="db-room-grid">

        {filteredData.length === 0 ? (

          <p className="db-no-room-text">
            No Rooms Found
          </p>

        ) : (

          filteredData.map((item) => {

            const address =
              item.address ||
              item.city ||
              item.location ||
              "";

            const images =
              Array.isArray(
                item.images
              )
                ? item.images.filter(
                    Boolean
                  )
                : [];

            const index =
              activeIndex[item._id] || 0;

            return (

              <div
                key={item._id}
                className="db-room-card"
              >

                {/* IMAGE */}

                <div className="db-room-image-wrapper">

                  <span className="db-room-type-badge">
                    {item.type}
                  </span>

                  <span className="db-room-gender-badge">
                    {item.gender ||
                      "Unisex"}
                  </span>

                  <img
                    className="db-room-image"
                    src={
                      images.length
                        ? `http://localhost:5000/${images[index]}`
                        : "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt="room"
                    loading="lazy"
                  />

                </div>

                {/* CONTENT */}

                <div className="db-room-content">

                  <h3 className="db-room-title">

                    {item.title ||
                      "No Title"}

                  </h3>

                  <p className="db-room-location">

                    <FaMapMarkerAlt />

                    {address}

                  </p>

                  <h4 className="db-room-price">

                    ₹{item.price || "N/A"}

                    <span>
                      /month
                    </span>

                  </h4>

                  {/* BUTTON */}

                 <button className="suni" onClick={() => navigate(`/RoomDetails/${item._id}`)}>
                  View All
                 </button>

                </div>

              </div>

            );

          }) 

        )}

      </div>

    </div>

  );

};

export default Dashboard;