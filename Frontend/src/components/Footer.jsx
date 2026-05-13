import React from "react";
import "./Footer.css";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="br-footer">

      {/* ================= TOP ================= */}

      <div className="br-footer-top">

        {/* COMPANY */}

        <div className="br-footer-col">
          <h4>RoomHai</h4>

          <p>
            Find affordable PGs, rooms, flats &
            hostels easily across India with
            trusted providers and verified stays.
          </p>

          <div className="br-socials">

            <a href="/">
              <FaInstagram />
            </a>

            <a href="/">
              <FaFacebookF />
            </a>

            <a href="/">
              <FaLinkedinIn />
            </a>

          </div>
        </div>

        {/* QUICK LINKS */}

        <div className="br-footer-col">

          <h4>Quick Links</h4>

          <a href="/">Home</a>

          <a href="/ProviderSignup">
            Providers
          </a>

          <a href="/contact">
            Contact Us
          </a>

          <a href="/Dashboard">
            Find Rooms
          </a>

        </div>

        {/* SUPPORT */}

        <div className="br-footer-col">

          <h4>Support</h4>

          <a href="/">
            Help Center
          </a>

          <a href="/">
            Terms & Conditions
          </a>

          <a href="/">
            Privacy Policy
          </a>

          <a href="/">
            Report Issue
          </a>

        </div>

        {/* CONTACT */}

        <div className="br-footer-col">

          <h4>Contact</h4>

          <p>
            <FaMapMarkerAlt
              style={{ marginRight: "8px" }}
            />
            Dehradun, India
          </p>

          <p>
            <FaPhoneAlt
              style={{ marginRight: "8px" }}
            />
            +91 6395235895
          </p>

          {/* <p>
            <FaEnvelope
              style={{ marginRight: "8px" }}
            />
            support@bacheloroom.com
          </p> */}

        </div>

      </div>

      {/* ================= DIVIDER ================= */}

      <div className="br-footer-line"></div>

      {/* ================= BOTTOM ================= */}

      <div className="br-footer-bottom">

        <p>
          © 2026 RoomHai.
          All Rights Reserved.
        </p>

        <div className="br-bottom-links">

          <a href="/">
            Privacy
          </a>

          <a href="/">
            Terms
          </a>

          <a href="/">
            Sitemap
          </a>

        </div>

      </div>

    </footer>
  );
};

export default Footer;