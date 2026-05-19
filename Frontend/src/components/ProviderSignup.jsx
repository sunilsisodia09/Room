import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProviderSignup.css";

export default function ProviderSignup() {

  const navigate = useNavigate();

  // ================= STATES =================

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({

    name: "",
    mobile: "",
    password: "",
    businessType: "",
    city: "",
    address: "",
    ownerName: "",
    email: "",
    about: "",
    photo: null,

  });

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    const {
      name,
      value,
      files,
    } = e.target;

    if (name === "photo") {

      setForm({

        ...form,

        photo: files[0],

      });

    } else {

      setForm({

        ...form,

        [name]: value,

      });

    }

  };

  // ================= VALIDATIONS =================

  const validateStep1 = () => {

    if (

      !form.name ||

      !form.email ||

      !form.mobile ||

      !form.password

    ) {

      alert(
        "Please fill all basic details"
      );

      return false;

    }

    // NAME VALIDATION

    if (form.name.length < 3) {

      alert(
        "Name must be at least 3 characters"
      );

      return false;

    }

    // EMAIL VALIDATION

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(form.email)
    ) {

      alert(
        "Enter valid email"
      );

      return false;

    }

    // MOBILE VALIDATION

    const mobileRegex =
      /^[0-9]{10}$/;

    if (
      !mobileRegex.test(form.mobile)
    ) {

      alert(
        "Mobile number must be 10 digits"
      );

      return false;

    }

    // PASSWORD VALIDATION

    if (
      form.password.length < 6
    ) {

      alert(
        "Password must be at least 6 characters"
      );

      return false;

    }

    return true;

  };

  const validateStep2 = () => {

    if (

      !form.businessType ||

      !form.city ||

      !form.address ||

      !form.ownerName ||

      !form.about

    ) {

      alert(
        "Please fill all business details"
      );

      return false;

    }

    if (
      form.about.length < 20
    ) {

      alert(
        "About section should be at least 20 characters"
      );

      return false;

    }

    return true;

  };

  // ================= CHECK PROVIDER =================

  const checkProvider = async () => {

    try {

      const res = await fetch(

        "http://localhost:5000/api/providers/check-provider",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            email: form.email,

            mobile: form.mobile,

          }),

        }

      );

      const data =
        await res.json();

      return {

        ok: res.ok,

        data,

      };

    } catch (err) {

      console.log(err);

      return {

        ok: false,

      };

    }

  };

  // ================= CONTINUE =================

  const handleContinue =
    async () => {

      // VALIDATE STEP 1

      const isValid =
        validateStep1();

      if (!isValid) return;

      // CHECK PROVIDER

      const result =
        await checkProvider();

      if (!result.ok) {

        alert(

          result.data?.message ||

            "Provider already exists"

        );

        return;

      }

      setStep(2);

    };

  // ================= SUBMIT =================

  const handleSubmit =
    async () => {

      // VALIDATE STEP 2

      const isValid =
        validateStep2();

      if (!isValid) return;

      try {

        const formData =
          new FormData();

        formData.append(
          "name",
          form.name
        );

        formData.append(
          "email",
          form.email
        );

        formData.append(
          "mobile",
          form.mobile
        );

        formData.append(
          "password",
          form.password
        );

        formData.append(
          "businessType",
          form.businessType
        );

        formData.append(
          "city",
          form.city
        );

        formData.append(
          "address",
          form.address
        );

        formData.append(
          "ownerName",
          form.ownerName
        );

        formData.append(
          "about",
          form.about
        );

        if (form.photo) {

          formData.append(
            "photo",
            form.photo
          );

        }

        const res = await fetch(

          "http://localhost:5000/api/providers/register",

          {

            method: "POST",

            body: formData,

          }

        );

        const data =
          await res.json();

        if (!res.ok) {

          alert(

            data.message ||

              "Registration Failed"

          );

          return;

        }

        alert(
          "Signup Successful 🚀"
        );

        localStorage.setItem(

          "provider",

          JSON.stringify(
            data.provider
          )

        );

        navigate(
          "/ProviderDashboard"
        );

      } catch (err) {

        console.log(err);

        alert("Server Error");

      }

    };

  return (

    <div className="ps-page">

      <div className="ps-container">

        {/* LEFT */}

        <div className="ps-left">

          <h2>
            Provider Registration
          </h2>

          {/* STEP 1 */}

          {step === 1 && (

            <>

              <input

                name="name"

                placeholder="Name"

                onChange={
                  handleChange
                }

              />

              <input

                name="email"

                type="email"

                placeholder="Email"

                onChange={
                  handleChange
                }

              />

              <input

                name="mobile"

                placeholder="Mobile"

                maxLength="10"

                onChange={
                  handleChange
                }

              />

              <input

                name="password"

                type="password"

                placeholder="Password"

                onChange={
                  handleChange
                }

              />

              <button
                onClick={
                  handleContinue
                }
              >

                Continue

              </button>

            </>

          )}

          {/* STEP 2 */}

          {step === 2 && (

            <>

              <input

                name="businessType"

                placeholder="PG / Hostel / Flat"

                onChange={
                  handleChange
                }

              />

              <input

                name="city"

                placeholder="City"

                onChange={
                  handleChange
                }

              />

              <input

                name="address"

                placeholder="Address"

                onChange={
                  handleChange
                }

              />

            </>

          )}

        </div>

        {/* RIGHT */}

        <div className="ps-right">

          {step === 2 ? (

            <>

              <input

                name="ownerName"

                placeholder="Owner Name"

                onChange={
                  handleChange
                }

              />

              <textarea

                name="about"

                placeholder="About Business"

                onChange={
                  handleChange
                }

              />

              <input

                type="file"

                name="photo"

                accept="image/*"

                onChange={
                  handleChange
                }

              />

              <button
                onClick={
                  handleSubmit
                }
              >

                Submit & Go Dashboard

              </button>

            </>

          ) : (

            <>

              <h2>
                Grow Your Business 🚀
              </h2>

              <p>

                List PG, Rooms,
                Hostels & Flats easily

              </p>

            </>

          )}

          {/* LOGIN */}

          <div className="signup-login-link">

            <p>

              Already have an account?{" "}

              <span

                onClick={() =>

                  navigate(
                    "/ProviderLogin"
                  )

                }

              >

                Login here

              </span>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}