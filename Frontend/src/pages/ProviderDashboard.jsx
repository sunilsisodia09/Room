import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProviderDashboard.css";

import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaUser,
  FaPlus,
  FaSignOutAlt,
  FaTachometerAlt,
  FaHome,
} from "react-icons/fa";

export default function ProviderDashboard() {

  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);

  const [listings, setListings] = useState([]);

  const [activeTab, setActiveTab] =
    useState("dashboard");

  // ================= LOAD PROVIDER =================

  useEffect(() => {

    const data =
      localStorage.getItem("provider");

    if (!data) {

      navigate("/provider-login");

      return;
    }

    setProvider(JSON.parse(data));

  }, [navigate]);

  // ================= TOGGLE AVAILABILITY =================

  const toggleAvailability = async (
    id,
    currentStatus
  ) => {

    try {

      const res = await fetch(

        `/api/listings/availability/${id}`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            available:
              !currentStatus,

          }),

        }

      );

      const data = await res.json();

      if (data.success) {

        setListings((prev) =>

          prev.map((item) =>

            item._id === id

              ? {

                  ...item,

                  available:
                    !currentStatus,

                }

              : item

          )

        );

      }

    } catch (err) {

      console.log(err);

    }

  };

  // ================= FETCH LISTINGS =================

  const fetchListings = async (id) => {

    try {

      const res = await fetch(
        `/api/listings/provider/${id}`
      );

      const data = await res.json();

      console.log("LISTINGS:", data);

      setListings(
        data.listings ||
        data.data ||
        data ||
        []
      );

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {

    if (provider?._id) {

      fetchListings(provider._id);

    }

  }, [provider]);

  // ================= IMAGE FIX FUNCTION =================

  const getImageUrl = (img) => {

    // NO IMAGE
    if (!img) {

      return "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    }

    // GOOGLE IMAGE URL
    if (
      img.startsWith("http://") ||
      img.startsWith("https://")
    ) {

      return img;

    }

    // LOCAL IMAGE
    let imagePath =
      img.replace(/\\/g, "/");

    if (
      !imagePath.startsWith("uploads/")
    ) {

      imagePath =
        `uploads/${imagePath}`;

    }

    return `/${imagePath}`;
  };

  if (!provider)
    return <h2>Loading...</h2>;

  return (

    <div className="pd-container">

      {/* ================= SIDEBAR ================= */}

      <div className="sidebar">

        <h2 className="sidebar-logo">
          <FaHome />
          Provider-Panel
        </h2>

        <button
          onClick={() =>
            setActiveTab("dashboard")
          }
        >
          <FaTachometerAlt />
          Dashboard
        </button>

        <button
          onClick={() =>
            setActiveTab("profile")
          }
        >
          <FaUser />
          Profile
        </button>

        <button
          onClick={() =>
            setActiveTab("add")
          }
        >
          <FaPlus />
          Add Listing
        </button>

        <button
          onClick={() => {

            localStorage.removeItem(
              "provider"
            );

            navigate("/Home");

          }}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

      {/* ================= MAIN ================= */}

      <div className="main">

        {/* ================= DASHBOARD ================= */}

        {activeTab === "dashboard" && (

          <>

            <div className="top-bar">

              <div>

                <h2 className="dashboard-heading">
                  <FaHome />
                  All Listings
                </h2>

                <p className="total-listing">
                  Total Listings :
                  {listings.length}
                </p>

              </div>

            </div>

            {listings.length === 0 ? (

              <p className="empty-text">
                No listings found
              </p>

            ) : (

              <div className="listing-grid">

                {listings.map((item) => {

                  const images =
                    Array.isArray(item.images)
                      ? item.images
                      : [];

                  const firstImage =
                    images.length > 0
                      ? images[0]
                      : "";

                  return (

                    <div
                      key={item._id}
                      className="listing-card"
                    >

                      {/* IMAGE */}

                      <div className="listing-image-wrapper">

                        <img
                          className="listing-image"

                          src={getImageUrl(firstImage)}

                          alt="listing"

                          onError={(e) => {

                            e.target.src =
                              "https://via.placeholder.com/400x250?text=No+Image";

                          }}
                        />

                        <span className="listing-type">
                          {item.type ||
                            item.businessType}
                        </span>

                      </div>

                      {/* INFO */}

                      <div className="listing-info">

                        <h3>
                          {item.title ||
                            "No Title"}
                        </h3>

                        <p>
                          📍 {item.city}
                        </p>

                        <p>
                          🏠 {item.address}
                        </p>

                        <h4>
                          ₹ {item.price}
                        </h4>

                        {/* ================= AVAILABILITY ================= */}

                        <div className="availability-section">

                          <span

                            className={

                              item.available
                                ? "available"
                                : "not-available"

                            }

                          >

                            {item.available
                              ? "Available"
                              : "Not Available"}

                          </span>

                          <button

                            className="toggle-btn"

                            onClick={() =>

                              toggleAvailability(

                                item._id,

                                item.available

                              )

                            }

                          >

                            {item.available
                              ? "Mark Unavailable"
                              : "Mark Available"}

                          </button>

                        </div>

                        {/* ACTIONS */}

                        <div className="action-icons">

                          {/* CALL */}

                          {item.phone && (

                            <a
                              href={`tel:${item.phone}`}

                              className="icon phone"
                            >
                              <FaPhoneAlt />
                            </a>

                          )}

                          {/* WHATSAPP */}

                          {item.whatsapp && (

                            <a
                              href={`https://wa.me/${item.whatsapp}`}

                              target="_blank"

                              rel="noreferrer"

                              className="icon whatsapp"
                            >
                              <FaWhatsapp />
                            </a>

                          )}

                          {/* MAP */}

                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              item.address ||
                              item.city
                            )}`}

                            target="_blank"

                            rel="noreferrer"

                            className="icon map"
                          >
                            <FaMapMarkerAlt />
                          </a>

                        </div>

                      </div>

                    </div>

                  );
                })}

              </div>

            )}

          </>

        )}

        {/* ================= PROFILE ================= */}

        {activeTab === "profile" && (

          <div className="profile-box">

            <img
              className="profile-image"

              src={getImageUrl(provider.photo)}

              alt="profile"

              onError={(e) => {

                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

              }}
            />

            <h2>{provider.name}</h2>

            <p>{provider.email}</p>

            <p>{provider.mobile}</p>

            <p>{provider.city}</p>

            <p>{provider.address}</p>

          </div>

        )}

        {/* ================= ADD LISTING ================= */}

        {activeTab === "add" && (

          <div className="add-box">

            <h2>
              <FaPlus />
              Add Listing
            </h2>

            <button
              className="add-btn"

              onClick={() =>
                navigate("/AddListing")
              }
            >
              Open Add Listing Page
            </button>

          </div>

        )}

      </div>

    </div>

  );
}