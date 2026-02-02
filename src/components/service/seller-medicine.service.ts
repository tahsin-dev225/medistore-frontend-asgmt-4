import { CLIENT_BACKEND_URL } from "../layout/home-category";

export const sellerMedicineService = {
  getSellerMedicines: async () => {
    try {
      const res = await fetch(
        `${CLIENT_BACKEND_URL}/api/medicine/seller/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
          cache : "no-cache"
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch seller medicines");
      }

      const medicines = await res.json();

      return { data: medicines.data, error: null };
    } catch (err) {
      console.error(err);
      return {
        data: null,
        error: { message: "Something went wrong while fetching medicines" },
      };
    }
  },
};
