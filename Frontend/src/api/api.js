const API = import.meta.env.VITE_API_URL;

// GET ALL LISTINGS
export const getAllListings = async () => {
  const res = await fetch(`${API}/api/listings/all`);
  return res.json();
};

// GET NEAR LISTINGS
export const getNearListings = async (lat, lng) => {
  const res = await fetch(
    `${API}/api/listings/near?lat=${lat}&lng=${lng}`
  );
  return res.json();
};