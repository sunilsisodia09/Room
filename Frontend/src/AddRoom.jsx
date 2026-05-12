import React, { useState } from "react";

const AddRoom = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "PG",
    gender: "Any",
    price: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      alert("Room Added Successfully");

      // reset form
      setForm({
        name: "",
        location: "",
        type: "PG",
        gender: "Any",
        price: ""
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Room</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Room Name" onChange={handleChange} required /><br /><br />

        <input name="location" placeholder="Location" onChange={handleChange} required /><br /><br />

        <select name="type" onChange={handleChange}>
          <option>PG</option>
          <option>Hostel</option>
          <option>Room</option>
          <option>Flat</option>
        </select><br /><br />

        <select name="gender" onChange={handleChange}>
          <option>Any</option>
          <option>Boys</option>
          <option>Girls</option>
        </select><br /><br />

        <input name="price" type="number" placeholder="Price" onChange={handleChange} /><br /><br />

        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;