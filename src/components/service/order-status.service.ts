import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";

export type OrderStatus = | "PENDING" | "SHIPPED" | "DELIVERED"| "CANCELLED";

export const orderStatusService = {
  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    try {
      const res = await fetch(
        `${CLIENT_BACKEND_URL}/api/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update order status");
      }

      const updatedOrder = await res.json();

      return { data: updatedOrder, error: null };
    } catch (err) {
      console.error(err);
      return {
        data: null,
        error: { message: "Order status update failed" },
      };
    }
  },
};
