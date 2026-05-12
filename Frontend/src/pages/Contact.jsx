import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    alert("Message sent successfully 🚀");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      {/* LEFT INFO */}
      <div className="contact-info">
        <h2>Contact BachelorRoom</h2>

        <p>
          We help students and bachelors find affordable rooms, PGs, and shared spaces easily.
        </p>

        <div className="info-box">
          <h4>📍 Address</h4>
          <p>Dehradun, Uttarakhand, India</p>
        </div>

        <div className="info-box">
          <h4>📞 Phone</h4>
          <p>+91 98765 43210</p>
        </div>

        <div className="info-box">
          <h4>📧 Email</h4>
          <p>support@bachelorroom.com</p>
        </div>

        <div className="info-box">
          <h4>⏰ Working Hours</h4>
          <p>Mon - Sat (9AM - 7PM)</p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="contact-form">
        <h2>Get in Touch</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={form.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>

    </div>
  );
};

export default Contact;