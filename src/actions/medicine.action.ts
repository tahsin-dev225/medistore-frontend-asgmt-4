// import { cookies } from "next/headers";
import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";

export interface MedicineParams {
  title: string;
  categoryId: string;
  image: string;
  stock: number;
  price: number;
}

export const medicineAction = {
  addMedicine: async (params: MedicineParams) => {
    try {
      // cookie access (only server-side)
      // cookies(); // just to ensure auth cookie exists

      const res = await fetch(`${CLIENT_BACKEND_URL}/api/medicine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error("Failed to add medicine");
      }

      const medicine = await res.json();

      return { data: medicine, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
