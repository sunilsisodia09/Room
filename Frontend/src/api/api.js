const API = "https://room-c762.onrender.com";
// GET ALL LISTINGS
export const getAllListings = async () => {
  try {
    const res = await fetch(`${API}/api/listings/all`);

    if (!res.ok) throw new Error("Failed to fetch listings");

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

// GET NEAR LISTINGS
export const getNearListings = async (lat, lng) => {
  try {
    const res = await fetch(
      `${API}/api/listings/near?lat=${lat}&lng=${lng}`
    );

    if (!res.ok) throw new Error("Failed to fetch nearby listings");

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};