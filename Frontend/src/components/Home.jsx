import React, { useEffect, useState } from "react";
import "./Home.css";

import room from "../assets/room.avif";

import HomeSection from "../pages/HomeSection";
import Login from "./Login";
import SearchBar from "../pages/SearchBar";

import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
} from "react-icons/fa";

const Home = () => {

  const navigate = useNavigate();

  // ================= STATES =================

  const [showLogin, setShowLogin] =
    useState(false);

  const [listings, setListings] =
    useState([]);

  const [imageIndex, setImageIndex] =
    useState({});

  // ================= FETCH LISTINGS =================

  const fetchListings = async () => {

    try {

      // ================= GEOLOCATION =================

      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

          // ================= SUCCESS =================

          async (position) => {

            try {

              const lat =
                position.coords.latitude;

              const lng =
                position.coords.longitude;

              const response =
                await fetch(

                  `http://localhost:5000/api/listings/near?lat=${lat}&lng=${lng}`

                );

              const data =
                await response.json();

              console.log(
                "Nearby Listings:",
                data
              );

              setListings(

                Array.isArray(data)

                  ? data

                  : data.listings || []

              );

            } catch (err) {

              console.log(
                "Nearby Fetch Error:",
                err
              );

              setListings([]);

            }

          },

          // ================= LOCATION DENIED =================

          async () => {

            try {

              const response =
                await fetch(

                  "http://localhost:5000/api/listings"

                );

              const data =
                await response.json();

              console.log(
                "All Listings:",
                data
              );

              setListings(

                Array.isArray(data)

                  ? data

                  : data.listings || []

              );

            } catch (err) {

              console.log(
                "Fallback Fetch Error:",
                err
              );

              setListings([]);

            }

          }

        );

      }

      // ================= GEOLOCATION NOT AVAILABLE =================

      else {

        const response =
          await fetch(

            "http://localhost:5000/api/listings"

          );

        const data =
          await response.json();

        setListings(

          Array.isArray(data)

            ? data

            : data.listings || []

        );

      }

    } catch (err) {

      console.log(
        "Main Fetch Error:",
        err
      );

      setListings([]);

    }

  };

  // ================= LOAD DATA =================

  useEffect(() => {

    fetchListings();

  }, []);

  // ================= AUTO IMAGE SLIDER =================

  useEffect(() => {

    const interval = setInterval(() => {

      setImageIndex((prev) => {

        const updated = { ...prev };

        listings.forEach((item) => {

          const images =
            item.images || [];

          if (images.length > 1) {

            updated[item._id] =

              ((updated[item._id] || 0) + 1) %

              images.length;

          }

        });

        return updated;

      });

    }, 2500);

    return () =>
      clearInterval(interval);

  }, [listings]);

  // ================= JSX =================

  return (

    <div className="home">

      {/* HERO */}

      <section className="hero">

        {/* LEFT */}

        <div className="hero-left">

          <h1>

            Find the Perfect Stay.

            <br />

            <span>
              Live. Learn. Enjoy. Grow.
            </span>

          </h1>

          <p>

            Discover comfortable PGs,
            hostels, rooms, and flats
            tailored for students and
            working professionals.

          </p>

          <div className="hero-buttons">

            <button

              className="primary-btn"

              onClick={() => {

                navigate("/dashboard");

                window.scrollTo({

                  top: 0,

                  behavior: "smooth",

                });

              }}

            >

              RoomHai

            </button>

            <button

              className="outline-btn"

              onClick={() =>

                navigate(
                  "/ProviderSignup?role=provider"
                )

              }

            >

              I'm a Provider

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <div className="hero-image-wrapper">

            <img

              src={room}

              alt="stay"

              className="hero-image"

            />

          </div>

        </div>

      </section>

      {/* SEARCH */}

      <SearchBar />

      {/* HOME SECTION */}

      <HomeSection />

      {/* LISTINGS */}

      <section className="home-listings">

        <h2>Listings</h2>

        <div className="grid">

          {!Array.isArray(listings) ||

          listings.length === 0 ? (

            <p>No listings found</p>

          ) : (

            listings

              .slice(0, 4)

              .map((item) => {

                const index =

                  imageIndex[item._id] || 0;

                const image =

                  item.images?.length > 0

                    ? `http://localhost:5000/${item.images[index]}`

                    : "https://via.placeholder.com/300";

                return (

                  <div

                    key={item._id}

                    className="card"

                  >

                    {/* IMAGE */}

                    <div className="card-image-box">

                      <img
                        src={image}
                        alt="room"
                      />

                      {/* TYPE */}

                      <span className="card-badge-left">

                        {item.type || "PG"}

                      </span>

                      {/* GENDER */}

                      <span className="card-badge-right">

                        {item.gender || "Any"}

                      </span>

                    </div>

                    {/* CONTENT */}

                    <div className="card-content">

                      <h3>

                        {item.title ||
                          "Room"}

                      </h3>

                      {/* LOCATION */}

                      <div className="card-location">

                        <FaMapMarkerAlt />

                        <span>

                          {item.city ||

                            item.address ||

                            "Location"}

                        </span>

                      </div>

                      {/* FACILITIES */}

                      <div className="card-facilities">

                        {Array.isArray(
                          item.facilities
                        ) &&

                        item.facilities
                          .length > 0 ? (

                          item.facilities

                            .slice(0, 4)

                            .map(
                              (
                                facility,
                                i
                              ) => (

                                <span

                                  key={i}

                                  className="facility-tag"

                                >

                                  {facility}

                                </span>

                              )

                            )

                        ) : (

                          <>

                            <span className="facility-tag">

                              WiFi

                            </span>

                            <span className="facility-tag">

                              AC

                            </span>

                            <span className="facility-tag">

                              Food

                            </span>

                          </>

                        )}

                      </div>

                      {/* PRICE */}

                      <div className="card-price">

                        ₹
                        {item.price || "0"}

                        <span>
                          /month
                        </span>

                      </div>

                      {/* BUTTON */}

                      <button

                        className="card-btn"

                        onClick={() =>

                          navigate(
                            `/RoomDetails/${item._id}`
                          )

                        }

                      >

                        View All

                      </button>

                    </div>

                  </div>

                );

              })

          )}

        </div>

      </section>

      {/* LOGIN */}

      {showLogin && (

        <Login

          closePopup={() =>
            setShowLogin(false)
          }

        />

      )}

    </div>

  );

};

export default Home;