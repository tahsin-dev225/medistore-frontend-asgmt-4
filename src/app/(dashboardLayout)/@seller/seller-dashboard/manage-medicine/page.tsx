"use client";

import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Medicine {
  id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export default function ManageStock() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [stockMap, setStockMap] = useState<Record<string, number>>({});

  console.log(medicines);

  const handleInputChange = (id: string, value: number) => {
    setStockMap((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleStockUpdate = async (id: string) => {
    const newStock = stockMap[id];
    const toastId = toast.loading("Updating stock...");

    try {
      const res = await fetch(`${CLIENT_BACKEND_URL}/api/medicine/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ stock: newStock }),
      });

      if (!res.ok) throw new Error();

      toast.success("Stock updated", { id: toastId });
    } catch {
      toast.error("Failed to update stock", { id: toastId });
    }
  };

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const res = await fetch(`${CLIENT_BACKEND_URL}/api/medicine`);
        const medicine = await res.json();
        setMedicines(medicine?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicine();
  }, [medicines]);

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
              <th className="px-5 py-3">Image</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-4 py-3">Update Stock</th>
            </tr>
          </thead>

          <tbody>
            {medicines?.map((medicine) => (
              <tr key={medicine?.id} className="border-t">
                <td className="px-4 py-3">
                  <Image
                    src={medicine?.image}
                    alt={medicine?.title}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </td>

                <td className="px-4 py-3">{medicine?.title}</td>
                <td className="px-4 py-3">${medicine?.price}</td>
                <td className="px-4 py-3 font-semibold">{medicine?.stock}</td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={stockMap[medicine?.id] ?? medicine?.stock}
                      onChange={(e) =>
                        handleInputChange(medicine?.id, Number(e.target.value))
                      }
                      className="w-20 border rounded px-2 py-1 text-sm"
                    />

                    <button
                      onClick={() => handleStockUpdate(medicine?.id)}
                      className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className=" md:hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {medicines?.map((medicine) => (
              <tr key={medicine?.id} className="border-t">
                <td className="px-4 py-3">
                  <Image
                    src={medicine?.image}
                    alt={medicine?.title}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </td>

                <td className="px-4 py-3">{medicine?.title}</td>
                <td className="px-4 py-3">${medicine?.price}</td>
                <td className="px-4 py-3 font-semibold">{medicine?.stock}</td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={stockMap[medicine?.id] ?? medicine?.stock}
                      onChange={(e) =>
                        handleInputChange(medicine?.id, Number(e.target.value))
                      }
                      className="w-20 border rounded px-2 py-1 text-sm"
                    />

                    <button
                      onClick={() => handleStockUpdate(medicine?.id)}
                      className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
