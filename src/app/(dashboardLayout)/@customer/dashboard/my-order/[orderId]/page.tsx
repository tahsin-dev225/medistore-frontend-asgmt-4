"use client";

import {
  OrderStatus,
  orderStatusService,
} from "@/components/service/order-status.service";
import {
  Calendar,
  Package,
  Truck,
  CheckCircle,
  ArrowLeft,
  Printer,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface IOrder {
  id: string;
  medicineId: string;
  customerId: string;
  sellerId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

export default function OrderDetailsPage() {
  const [orders, setOrders] = useState<IOrder>();
  const { orderId } = useParams();

  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
    SHIPPED: "bg-blue-100 text-blue-700 border-blue-200",
    DELIVERED: "bg-green-100 text-green-700 border-green-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const orderData = await orderStatusService.getOrderDetails(
        orderId as string,
      );
      setOrders(orderData);
    };

    fetchOrder();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <Link
            href="/dashboard/orders"
            className="flex items-center text-sm text-gray-500 hover:text-blue-600 mb-2 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Orders
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Order ID:</h1>
          <p className="text-sm text-gray-500 flex items-center mt-1">
            <Calendar size={14} className="mr-1" /> Placed on{" "}
            {new Date(orders?.createdAt!).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold border ${statusColors[orders?.status as keyof typeof statusColors]}`}
          >
            {orders?.status}
          </span>
          <button
            className="p-2 border rounded-lg hover:bg-gray-50 text-gray-600"
            title="Print Invoice"
          >
            <Printer size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-50 p-6 rounded-2xl border">
            <h3 className="font-semibold mb-6">Delivery Progress</h3>
            <div className="relative flex justify-between">
              <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 -z-0"></div>
              <div
                className={`absolute top-4 left-0 h-0.5 bg-green-500 -z-0 transition-all duration-500`}
                style={{
                  width: orders?.status === "DELIVERED" ? "100%" : "50%",
                }}
              ></div>

              <div className="z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white ring-4 ring-white">
                  <Package size={16} />
                </div>
                <span className="text-[10px] mt-2 font-medium">Placed</span>
              </div>

              <div className="z-10 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white ring-4 ring-white ${orders?.status !== "PENDING" ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <Truck size={16} />
                </div>
                <span className="text-[10px] mt-2 font-medium">Shipped</span>
              </div>

              <div className="z-10 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white ring-4 ring-white ${orders?.status === "DELIVERED" ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <CheckCircle size={16} />
                </div>
                <span className="text-[10px] mt-2 font-medium">Delivered</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border rounded-2xl">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Product Information
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                        Rx
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          Medicine ID: {orders?.medicineId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">${orders?.unitPrice}</td>
                  <td className="px-6 py-4 text-sm">{orders?.quantity}</td>
                  <td className="px-6 py-4 text-sm font-bold text-right text-blue-600">
                    ${orders?.totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <h3 className="font-bold text-lg border-b pb-3">Payment Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  ${orders?.totalPrice}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping Fee</span>
                <span className="font-medium text-gray-900">$0.00</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax</span>
                <span className="font-medium text-gray-900">$0.00</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-blue-600">${orders?.totalPrice}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
