"use client";

import { orderStatusService } from "@/components/service/order-status.service";
import { orderService } from "@/components/service/seller-order.service";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type OrderStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

interface Order {
  id: string;
  medicineId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  console.log("order", orders);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await orderStatusService.getCustomerOrder();

      setOrders(data?.data);
    };

    loadOrders();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800">My Orders</h1>
        <p className="text-sm text-gray-500">View your orders and status</p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left">Order ID</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">---</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order?.id} className="border-t ">
                <td className="px-5 py-4 font-mono text-xs text-gray-700">
                  ...{order?.id.slice(26, 30)}
                </td>

                <td className="px-5 py-4 text-center font-semibold">
                  ${order?.totalPrice}
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order?.status]}`}
                  >
                    {order?.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <Link href={`/dashboard/my-order/${order?.id}`}>
                    <Button
                      variant={"outline"}
                      // className="bg-amber-800 gap-3 py-1 items-center text-gray-50"
                    >
                      Details
                      <ArrowRight />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {orders?.map((order) => (
          <div
            key={order?.id}
            className="bg-white rounded-xl shadow-sm p-4 space-y-3"
          >
            <div className="flex justify-between">
              <span className="text-xs font-mono text-gray-500">
                #{order?.id.slice(26, 30)}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order?.status]}`}
              >
                {order?.status}
              </span>
            </div>

            <div className="text-sm text-gray-700">
              <p>Total: ${order?.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
