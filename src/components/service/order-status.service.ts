import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";
import { NextResponse } from "next/server";
import { toast } from "sonner";

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
  addOrder: async () => {
    const toastId = toast.loading("Creating order.....");
    try {
      const res = await fetch(
        `${CLIENT_BACKEND_URL}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      toast.success("Order created successfully.....",{id : toastId});
      return  await res.json();
    } catch (err) {
      console.error(err);
      toast.error("Order faild",{id : toastId});
      
    }
  },
  getCustomerOrder: async () => {
    try {
      const res = await fetch(
        `${CLIENT_BACKEND_URL}/api/order/customer/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      return  await res.json();
    } catch (err) {
      console.error(err);
    }
  },
  getOrderDetails : async (id : string) => {
    try {
      const res = await fetch(
        `${CLIENT_BACKEND_URL}/api/order/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      return  await res.json();
    } catch (err) {
      console.error(err);
    }
  },
};
