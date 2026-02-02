import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";

export interface SellerOrder {
  id: string;
  customerId: string;
  sellerId: string;
  medicineId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  getSellerOrders: async () => {
    try {
      const res = await fetch(
        `${CLIENT_BACKEND_URL}/api/order/seller/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch seller orders");
      }

      const orders = await res.json();

      return { data: orders.data, error: null };
    } catch (err) {
      console.error(err);
      return {
        data: null,
        error: { message: "Something went wrong while fetching orders" },
      };
    }
  },
};
