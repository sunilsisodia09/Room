import React, { useEffect, useState } from "react";
import "./Home.css";
import room from "../assets/room.avif";
import HomeSection from "../pages/HomeSection";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaUser,
  FaHome,
} from "react-icons/fa";
import SearchBar from "../pages/SearchBar";

const Home = () => {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [genderInput, setGenderInput] = useState("");

  const [listings, setListings] = useState([]);
  const [imageIndex, setImageIndex] = useState({}); // ✅ slider state

  // ================= FETCH LISTINGS =================
  const fetchListings = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            try {
              const res = await fetch(
                `http://localhost:5000/api/listings/near?lat=${lat}&lng=${lng}`
              );
              const data = await res.json();

              setListings(
                Array.isArray(data)
                  ? data
                  : data.listings || []
              );
            } catch (err) {
              console.log(err);
            }
          },
          async () => {
            const res = await fetch(
              "http://localhost:5000/api/listings/all"
            );
            const data = await res.json();

            setListings(
              Array.isArray(data)
                ? data
                : data.listings || []
            );
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // ================= AUTO IMAGE SLIDER =================
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => {
        const updated = { ...prev };

        listings.forEach((item) => {
          const images = item.images || [];
          if (images.length > 1) {
            updated[item._id] =
              ((updated[item._id] || 0) + 1) % images.length;
          }
        });

        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [listings]);

  // ================= SEARCH =================
  const handleSearch = () => {
    if (!location) {
      alert("Please enter location");
      return;
    }

    navigate(
      `/rooms?location=${location}&type=${type}&gender=${gender}`
    );
  };

  return (
    <div className="home">

      {/* HERO */}
  <section className="hero">
  {/* LEFT CONTENT */}
  <div className="hero-left">
   

    <h1>
      Find the Perfect Stay.
      <br />
      <span>Live. Learn. Enjoy. Grow.</span>
    </h1>

    <p>
      Discover comfortable PGs, hostels, rooms, and flats
      tailored for students and working professionals.
    </p>

    <div className="hero-buttons">
      <button
        className="primary-btn"
        onClick={() => navigate("/dashboard")}
      >
        I'm a Bachelor
      </button>

      <button
        className="outline-btn"
        onClick={() =>
          navigate("/ProviderSignup?role=provider")
        }
      >
        I'm a Provider
      </button>
    </div>

   
  </div>
    
  {/* RIGHT IMAGE */}
  <div className="hero-right">
    <div className="hero-image-wrapper">
      <img src={room} alt="stay" className="hero-image" />

 
    </div>
  </div>
 
</section>
        <SearchBar/>
      <HomeSection />
{/* LISTINGS */}
<section className="home-listings">

  <h2>Listings</h2>

  <div className="grid">

    {listings.length === 0 ? (

      <p>No listings found</p>

    ) : (

      listings.slice(0, 4).map((item) => {

        const index = imageIndex[item._id] || 0;

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

              {/* TITLE */}
              <h3>
                {item.title || "2 person room"}
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

                {Array.isArray(item.facilities) &&
                item.facilities.length > 0 ? (

                  item.facilities
                    .slice(0, 4)
                    .map((facility, i) => (

                      <span
                        key={i}
                        className="facility-tag"
                      >
                        {facility}
                      </span>

                    ))

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

                ₹{item.price || "0"}

                <span>/month</span>

              </div>

              {/* BUTTON */}
              <button
                className="card-btn"
                onClick={() =>
                  navigate(`/RoomDetails/${item._id}`)
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
        <Login closePopup={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default Home;