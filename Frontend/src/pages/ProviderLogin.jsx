import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

import { auth, provider } from "../firebase";
import "./ProviderLogin.css";

export default function ProviderLogin() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailOrMobile: "",
    password: "",
  });


  // ================= INPUT =================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  // ================= NORMAL LOGIN =================

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "/api/providers/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: form.emailOrMobile,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);


      // ================= ERROR =================

      if (!res.ok) {

        alert(data.message || "Login Failed");

        return;
      }


      // ================= SAVE PROVIDER =================

      localStorage.setItem(
        "provider",
        JSON.stringify(data.provider)
      );


      alert("Login Successful 🚀");


      // ================= NAVIGATE =================

      navigate("/ProviderDashboard");


    } catch (err) {

      console.log(err);

      alert("Server Error");

    }
  };


  // ================= GOOGLE LOGIN =================

  const handleGoogleLogin = async () => {

    try {

      // FIREBASE POPUP

      const result = await signInWithPopup(
        auth,
        provider
      );

      const user = result.user;


      // ================= PAYLOAD =================

      const payload = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };


      // ================= API =================

      const res = await fetch(
        "/api/providers/google-login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      console.log("GOOGLE RESPONSE:", data);


      // ================= ERROR =================

      if (!res.ok) {

        alert(
          data.message ||
          "Google Login Failed"
        );

        return;
      }


      // ================= SAVE PROVIDER =================

      localStorage.setItem(
        "provider",
        JSON.stringify(data.provider)
      );


      alert("Google Login Successful 🚀");


      // ================= NAVIGATE =================

      navigate("/ProviderDashboard");


    } catch (err) {

      console.log(err);

      alert("Google Login Failed");

    }
  };


  return (

    <div className="provider-login-page">

      <div className="provider-login-card">

        <h2>
          Provider Login
        </h2>


       


        <hr />


        {/* ================= GOOGLE LOGIN ================= */}

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
        >

          <FcGoogle size={22} />

          Continue with Google

        </button>


        {/* ================= SIGNUP ================= */}

        <p
          onClick={() =>
            navigate("/ProviderSignup")
          }
          style={{
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Don’t have an account? Signup
        </p>

      </div>

    </div>

  );
}