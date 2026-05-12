import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from '../assets/logo.jpeg'
import { FaHome } from "react-icons/fa";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">

      {/* LOGO */}
  <div className="nav-logo">

  <FaHome className="logo-icon" />

  <h2 className="logo-text">
    RoomHai
  </h2>

</div>

      {/* MENU */}
      <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>

        <li>
          <Link to="/Home" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>

       

        <li>
          <Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </li>

        {/* MOBILE BUTTONS */}
        <div className="nav-buttons">
          {/* <button
            className="login-btn"
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
          >
            Login
          </button> */}

          <button
            className="signup-btn"
            onClick={() => {
              navigate("/ProviderSignup");   // ✅ FIXED
              setMenuOpen(false);
            }}
          >
          Become a Provider
          </button>
        </div>

      </ul>

      {/* DESKTOP BUTTONS */}
      <div className="nav-buttons desktop-btns">
{/* 
        <button
          className="login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button> */}

<button
  className="signup-btn"
  onClick={() => navigate("/ProviderSignup")}
>
  Become a Provider
</button>

      </div>

      {/* HAMBURGER */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

    </nav>
  );
};

export default Navbar;