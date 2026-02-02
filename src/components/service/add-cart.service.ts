import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";

export interface CartParams {
  medicineId: string;
  quantity: number;
}

export const cartService = {
  addToCart: async (params: CartParams) => {
    try {
      const res = await fetch(`${CLIENT_BACKEND_URL}/api/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add to cart");
      }

      const cartData = await res.json();

      return { data: cartData, error: null };
    } catch (err: any) {
      console.error("Cart Error:", err);
      return { 
        data: null, 
        error: { message: err.message || "Something Went Wrong" } 
      };
    }
  },

  getCartItems: async () => {
    try {
      const res = await fetch(`${CLIENT_BACKEND_URL}/api/cart`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: "Could not fetch cart" };
    }
  }
};