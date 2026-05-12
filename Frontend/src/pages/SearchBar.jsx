// SearchBar.jsx

import React, { useState } from "react";

import {
  FaMapMarkerAlt,
  FaHome,
  FaUserFriends,
  FaSearch,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "./SearchBar.css";

export default function SearchBar() {

  const navigate = useNavigate();

  // STATES

  const [search, setSearch] =
    useState("");

  const [propertyType,
    setPropertyType] =
    useState("");

  const [gender,
    setGender] =
    useState("");

  // ================= SEARCH =================

  const handleSearch = () => {

    const params =
      new URLSearchParams();

    // SEARCH TEXT

    if (search.trim()) {

      params.append(
        "search",
        search.trim()
      );

    }

    // TYPE

    if (propertyType) {

      params.append(
        "type",
        propertyType
      );

    }

    // GENDER

    if (gender) {

      params.append(
        "gender",
        gender
      );

    }

    // NAVIGATE

    navigate(
      `/rooms?${params.toString()}`
    );

  };

  return (

    <div className="search-container">

      {/* SEARCH */}

      <div className="search-field">

        <FaMapMarkerAlt className="search-icon" />

        <input
          type="text"
          placeholder="Search Location, Area, City"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      {/* TYPE */}

      <div className="search-field">

        <FaHome className="search-icon" />

        <select
          value={propertyType}
          onChange={(e) =>
            setPropertyType(
              e.target.value
            )
          }
        >

          <option value="">
            PG / Hostel / Flat
          </option>

          <option value="PG">
            PG
          </option>

          <option value="Hostel">
            Hostel
          </option>

          <option value="Room">
            Room
          </option>

          <option value="Flat">
            Flat
          </option>

        </select>

      </div>

      {/* GENDER */}

      <div className="search-field">

        <FaUserFriends className="search-icon" />

        <select
          value={gender}
          onChange={(e) =>
            setGender(
              e.target.value
            )
          }
        >

          <option value="">
            Boys / Girls / Unisex
          </option>

          <option value="Boys">
            Boys
          </option>

          <option value="Girls">
            Girls
          </option>

          <option value="Unisex">
            Unisex
          </option>

        </select>

      </div>

      {/* BUTTON */}

      <button
        className="search-btn"
        onClick={handleSearch}
      >

        <FaSearch />

        Search

      </button>

    </div>

  );

}