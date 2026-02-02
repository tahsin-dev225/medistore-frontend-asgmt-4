"use client";

import { orderService } from "@/components/service/seller-order.service";
import { useEffect, useState } from "react";

export type OrderStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface Order {
  id: string;
  customerId: string;
  sellerId: string;
  medicineId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}

export default function ManageOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const order = await orderService.getAllOrders();
        console.log(order);
        setOrders(order);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicine();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800">Manage Orders</h1>
        <p className="text-sm text-gray-500">
          View all customer orders (read only)
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left">Order ID</th>
              <th className="px-5 py-3">Medicine ID</th>
              <th className="px-5 py-3">Qty</th>
              <th className="px-5 py-3">Unit Price</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-5 py-4 font-mono text-xs">
                  {order.id.slice(0, 8)}...
                </td>

                <td className="px-5 py-4 font-mono text-xs">
                  {order.medicineId.slice(0, 8)}...
                </td>

                <td className="px-5 py-4 text-center">{order.quantity}</td>

                <td className="px-5 py-4 text-center">${order.unitPrice}</td>

                <td className="px-5 py-4 text-center font-semibold">
                  ${order.totalPrice}
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-4">
        {orders?.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-gray-500">
                #{order.id.slice(0, 8)}
              </span>

              <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                {order.status}
              </span>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p>Medicine: {order.medicineId.slice(0, 8)}...</p>
              <p>Quantity: {order.quantity}</p>
              <p>Unit Price: ${order.unitPrice}</p>
              <p className="font-semibold">Total: ${order.totalPrice}</p>
            </div>

            <p className="text-xs text-gray-400">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
