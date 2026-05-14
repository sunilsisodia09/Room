import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaBuilding,
  FaBed,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";

import "./HomeSection.css";

const categories = [
  {
    title: "PG",
    subtitle: "Affordable PG stays",
    icon: <FaUser />,
    type: "PG",
  },

  {
    title: "Hostel",
    subtitle: "Comfortable hostel rooms",
    icon: <FaBuilding />,
    type: "Hostel",
  },

  {
    title: "Room",
    subtitle: "Private & shared rooms",
    icon: <FaBed />,
    type: "Room",
  },

  {
    title: "Flat",
    subtitle: "Modern rental flats",
    icon: <FaHome />,
    type: "Flat",
  },
];

const HomeSection = () => {

  const navigate = useNavigate();

  const handleCategory = (type) => {

    navigate(`/rooms?type=${type}`);

    setTimeout(() => {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }, 100);

  };

  return (

    <section className="home-section">

      {/* TOP */}

      <div className="section-header">

        <div>

          <span className="section-tag">
            Explore Categories
          </span>

          <h2 className="section-title">
            Discover the Best PGs,
            Rooms & Hostels.
          </h2>

        </div>

      </div>

      {/* CATEGORY GRID */}

      <div className="categories-grid">

        {categories.map((item, index) => (

          <div
            key={index}
            className="category-card"
            onClick={() =>
              handleCategory(item.type)
            }
          >

            {/* ICON */}

            <div className="category-icon">
              {item.icon}
            </div>

            {/* CONTENT */}

            <div className="category-content">

              <h3>{item.title}</h3>

              <p>{item.subtitle}</p>

            </div>

            {/* ARROW */}

            <div className="category-arrow">
              <FaArrowRight />
            </div>

          </div>

        ))}

      </div>

    </section>

  );

};

export default HomeSection;