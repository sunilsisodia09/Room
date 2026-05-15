import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./List.css";

const List = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const locationHook = useLocation();
  const query = new URLSearchParams(locationHook.search);

  const type = (query.get("type") || "").toLowerCase();

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/listings/all");
        const result = await res.json();

        const list = Array.isArray(result)
          ? result
          : result.listings || [];

        setData(list);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // FILTER DATA
  useEffect(() => {
    let filteredData = [...data];

    if (type) {
      filteredData = filteredData.filter((item) =>
        (item.type || "").toLowerCase().includes(type)
      );
    }

    setFiltered(filteredData);
  }, [data, type]);

  return (
    <div className="list-container">

      <h2>Available Listings</h2>

      <div className="list-grid">

        {filtered.length === 0 ? (
          <p>No Listings Found</p>
        ) : (
          filtered.map((item) => (
            <div key={item._id} className="list-card">

              <img
                src={
                  item.images?.length
                    ? `/${item.images[0]}`
                    : "https://via.placeholder.com/300"
                }
                alt=""
              />

              <h3>{item.title}</h3>
              <p>{item.city}</p>
              <p>₹ {item.price}</p>
              <span>{item.type}</span>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default List;