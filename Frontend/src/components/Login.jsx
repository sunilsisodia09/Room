import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

import { auth, provider } from "../firebase";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 const handleGoogleLogin = async () => {
  try {
    setLoading(true);

    console.log("Starting Google login...");

    const result = await signInWithPopup(auth, provider);

    console.log("Popup success:", result.user);

    const user = result.user;

    if (!user?.email) {
      alert("No email found from Google");
      return;
    }

    const res = await fetch(
      "/api/users/google-login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }),
      }
    );

    console.log("Backend response status:", res.status);

    const data = await res.json();

    console.log("Backend response:", data);

    if (!res.ok) {
      alert(data.message || "Backend login failed");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/dashboard");

  } catch (err) {
    console.log("FULL ERROR:", err.code, err.message);

    // 🔥 IMPORTANT: show real firebase error
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Welcome 👋</h2>
        <p>Login to continue</p>

        {/* GOOGLE LOGIN BUTTON */}
        <button
          className="google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle size={22} />
          {loading ? "Logging in..." : "Continue with Google"}
        </button>


        {/* MOBILE LOGIN (UI ONLY) */}
     


        <p className="terms">
          By continuing you agree to Terms & Privacy Policy
        </p>

      </div>
    </div>
  );
}