import React from "react";
import "./Contact.css";
import {
  FaHome,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Contact() {
  return (
    <div className="contact-page">

      {/* TOP TITLE */}
      <div className="contact-header">
        <h1>Contact Us</h1>
      </div>

      {/* MAIN SECTION */}
      <div className="contact-container">

        {/* LEFT FORM */}
        <div className="contact-form-box">
          <h2>Send Message</h2>

          <form>
            <input type="text" placeholder="Full Name" />

            <input type="email" placeholder="Email" />

            <textarea
              placeholder="Type your Message..."
              rows="4"
            ></textarea>

            <button type="submit">Send</button>
          </form>
        </div>

        {/* RIGHT INFO */}
        <div className="contact-info-box">

          <div className="info-item">
            <div className="icon">
              <FaHome />
            </div>

            <div className="info-text">
              <h3>Address</h3>
              <p>
                4671 Sugar Camp Road,
                <br />
                Owatonna, Minnesota,
                <br />
                55060
              </p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon">
              <FaPhoneAlt />
            </div>

            <div className="info-text">
              <h3>Phone</h3>
              <p>571-457-2321</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon">
              <FaEnvelope />
            </div>

            <div className="info-text">
              <h3>Email</h3>
              <p>ntamerwe@mfano.ga</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}