const API = "https://room-c762.onrender.com";

// ================= LISTINGS =================

// GET ALL LISTINGS
export const getAllListings = async () => {
  try {
    const res = await fetch(`${API}/api/listings/all`);

    if (!res.ok) {
      throw new Error("Failed to fetch all listings");
    }

    return await res.json();
  } catch (error) {
    console.error("getAllListings error:", error);
    return [];
  }
};

// GET NEAR LISTINGS
export const getNearListings = async (lat, lng) => {
  try {
    const res = await fetch(
      `${API}/api/listings/near?lat=${lat}&lng=${lng}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch near listings");
    }

    return await res.json();
  } catch (error) {
    console.error("getNearListings error:", error);
    return [];
  }
};