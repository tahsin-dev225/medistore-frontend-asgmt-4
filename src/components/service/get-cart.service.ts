// import { cookies } from "next/headers";
import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";

export interface MedicineParams {
  title: string;
  categoryId: string;
  image: string;
  stock: number;
  price: number;
}

export const cartService = {
  getCart: async () => {
    try {

      const res = await fetch(`${CLIENT_BACKEND_URL}/api/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials : "include"
      });

      if (!res.ok) {
        throw new Error("Failed to get cart");
      }

      const cart = await res.json();

      return cart 
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  deleteCart: async (id: string) => {
    try {
      // cookie access (only server-side)
      // const cookieStore = await cookies(); 

      const res = await fetch(`${CLIENT_BACKEND_URL}/api/cart/items/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials : "include"
      });

      if (!res.ok) {
        throw new Error("Failed to get cart");
      }

      const cart = await res.json();

      return cart 
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
