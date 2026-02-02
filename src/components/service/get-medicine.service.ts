// import { cookies } from "next/headers";
import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";

export interface MedicineParams {
  title: string;
  categoryId: string;
  image: string;
  stock: number;
  price: number;
}

export const getMedicineService = {
  getMedicine: async () => {
    try {
      // cookie access (only server-side)
      // const cookieStore = await cookies(); 

      const res = await fetch(`${CLIENT_BACKEND_URL}/api/medicine`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials : "include"
      });

      if (!res.ok) {
        throw new Error("Failed to get medicine");
      }

      const medicine = await res.json();

      return medicine 
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
