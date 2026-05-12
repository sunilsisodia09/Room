// RoomDetails.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPhone,
  FaCheck,
  FaArrowLeft,
  FaHome,
  FaUserFriends,
  FaMoneyBillWave,
  FaCity,
  FaLocationArrow,
} from "react-icons/fa";

import "./RoomDetails.css";

export default function RoomDetails() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [room, setRoom] =
    useState(null);

  const [mainImage,
    setMainImage] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  // ================= FETCH =================

  useEffect(() => {

    const fetchRoom = async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/listings/${id}`
          );

        console.log(
          "ROOM DATA =>",
          res.data
        );

        const data =
          res.data?.listing ||
          res.data?.data ||
          res.data;

        setRoom(data);

        if (
          data.images &&
          data.images.length > 0
        ) {

          setMainImage(
            data.images[0]
          );

        }

        setLoading(false);

      } catch (err) {

        console.log(err);

        setLoading(false);

      }

    };

    fetchRoom();

  }, [id]);

  // ================= LOADING =================

  if (loading) {

    return (
      <h2 className="loading">
        Loading...
      </h2>
    );

  }

  if (!room) {

    return (
      <h2 className="loading">
        No Room Found
      </h2>
    );

  }

  // ================= DATA =================

  const images =
    Array.isArray(room.images)
      ? room.images
      : [];

  const facilities =
    Array.isArray(room.facilities)
      ? room.facilities
      : [];

  return (

    <div className="details-page">

      {/* BACK BUTTON */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >

        <FaArrowLeft />

        Back

      </button>

      <div className="details-container">

        {/* LEFT */}

        <div className="details-left">

          {/* MAIN IMAGE */}

          <div className="main-image-box">

            <img
              src={
                mainImage
                  ? `http://localhost:5000/${mainImage}`
                  : "https://via.placeholder.com/700x450"
              }
              alt="room"
              className="main-image"
            />

          </div>

          {/* SIDE IMAGES */}

          <div className="side-images">

            {images.map((img, i) => (

              <img
                key={i}
                src={`http://localhost:5000/${img}`}
                alt=""
                className={
                  mainImage === img
                    ? "active-thumb"
                    : ""
                }
                onClick={() =>
                  setMainImage(img)
                }
              />

            ))}

          </div>

        </div>

        {/* RIGHT */}

        <div className="details-right">

          <h1 className="room-title">

            {room.title}

          </h1>

          {/* PRICE */}

          <div className="detail-item price-box">

            <FaMoneyBillWave />

            <span>

              ₹{room.price}/month

            </span>

          </div>

          {/* ADDRESS */}

          <div className="detail-item">

            <FaMapMarkerAlt />

            <span>

              {room.address}

            </span>

          </div>

          {/* CITY */}

          <div className="detail-item">

            <FaCity />

            <span>

              {room.city}

            </span>

          </div>

          {/* TYPE */}

          <div className="detail-item">

            <FaHome />

            <span>

              {room.type}

            </span>

          </div>

          {/* GENDER */}

          <div className="detail-item">

            <FaUserFriends />

            <span>

              {room.gender}

            </span>

          </div>

          {/* FACILITIES */}

          <div className="facilities-box">

            <h3>
              Facilities
            </h3>

            <div className="facilities-grid">

              {facilities.length > 0 ? (

                facilities.map((f, i) => (

                  <div
                    key={i}
                    className="facility"
                  >

                    <FaCheck />

                    {f}

                  </div>

                ))

              ) : (

                <p>
                  No Facilities
                </p>

              )}

            </div>

          </div>

          {/* GOOGLE MAP */}

          {room.location && (

            <a
              href={room.location}
              target="_blank"
              rel="noreferrer"
              className="map-btn"
            >

              <FaLocationArrow />

              Open Location

            </a>

          )}

          {/* BUTTONS */}

          <div className="contact-buttons">

            {room.whatsapp && (

              <a
                href={`https://wa.me/${room.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-btn"
              >

                <FaWhatsapp />

                WhatsApp

              </a>

            )}

            {room.phone && (

              <a
                href={`tel:${room.phone}`}
                className="call-btn"
              >

                <FaPhone />

                Call Now

              </a>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}