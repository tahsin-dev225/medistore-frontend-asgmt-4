"use client";

import { orderStatusService } from "@/components/service/order-status.service";
import { orderService } from "@/components/service/seller-order.service";
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

export default function ManageOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [data, setData] = useState(orders);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    const previousData = [...data];

    setData((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

    try {
      const { error } = await orderStatusService.updateOrderStatus(id, status);

      if (error) throw new Error(error.message);

      toast.success("Order status updated");
    } catch (err) {
      setData(previousData);
      toast.error("Failed to update order status");
    }
  };

  console.log("order", orders);

  useEffect(() => {
    const loadOrders = async () => {
      const { data, error } = await orderService.getSellerOrders();

      if (error) {
        toast.error(error.message);
        return;
      }

      setOrders(data);
    };

    loadOrders();
  }, [data, orders]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800">Manage Orders</h1>
        <p className="text-sm text-gray-500">
          View customer orders and update delivery status
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left">Order ID</th>
              <th className="px-5 py-3">Quantity</th>
              <th className="px-5 py-3">Unit Price</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order?.id} className="border-t">
                <td className="px-5 py-4 font-mono text-xs text-gray-700">
                  ...{order?.id.slice(26, 30)}
                </td>

                <td className="px-5 py-4 text-center">{order?.quantity}</td>

                <td className="px-5 py-4 text-center">${order?.unitPrice}</td>

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
                  <select
                    value={order?.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order?.id,
                        e.target.value as OrderStatus,
                      )
                    }
                    className="border rounded-md px-3 py-1 text-sm"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {data?.map((order) => (
          <div
            key={order?.id}
            className="bg-white rounded-xl shadow-sm p-4 space-y-3"
          >
            <div className="flex justify-between">
              <span className="text-xs font-mono text-gray-500">
                #{order?.id.slice(0, 8)}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order?.status]}`}
              >
                {order?.status}
              </span>
            </div>

            <div className="text-sm text-gray-700">
              <p>Quantity: {order?.quantity}</p>
              <p>Total: ${order?.totalPrice}</p>
            </div>

            <select
              value={order.status}
              onChange={(e) =>
                handleStatusChange(order?.id, e.target.value as OrderStatus)
              }
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="PENDING">Pending</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
