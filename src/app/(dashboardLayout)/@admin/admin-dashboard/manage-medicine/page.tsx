"use client";

import { getMedicineService } from "@/components/service/get-medicine.service";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface Medicine {
  id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
  sellerId: string;
  createdAt: string;
  _count: {
    review: number;
  };
}

export default function ManageMedicines() {
  const [medicines, setMediciens] = useState<Medicine[]>([]);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const medicine = await getMedicineService.getManageAllMedicine();
        console.log(medicine);
        setMediciens(medicine);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicine();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800">Manage Medicines</h1>
        <p className="text-sm text-gray-500">View all medicines (read only)</p>
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left">Image</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3">Reviews</th>
              <th className="px-5 py-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {medicines?.map((medicine) => (
              <tr key={medicine.id} className="border-t">
                <td className="px-5 py-4">
                  <Image
                    src={medicine.image}
                    alt={medicine.title}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </td>

                <td className="px-5 py-4">{medicine.title}</td>

                <td className="px-5 py-4 text-center">${medicine.price}</td>

                <td className="px-5 py-4 text-center font-semibold">
                  {medicine.stock}
                </td>

                <td className="px-5 py-4 text-center">
                  {medicine._count.review}
                </td>

                <td className="px-5 py-4 text-xs text-gray-500">
                  {new Date(medicine.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {medicines?.map((medicine) => (
          <div
            key={medicine.id}
            className="bg-white rounded-xl shadow-sm p-4 space-y-2"
          >
            <div className="flex gap-3">
              <Image
                src={medicine.image}
                alt={medicine.title}
                width={60}
                height={60}
                className="rounded"
              />

              <div>
                <p className="font-medium">{medicine.title}</p>
                <p className="text-sm text-gray-500">
                  Price: ${medicine.price}
                </p>
                <p className="text-sm">
                  Stock: <span className="font-semibold">{medicine.stock}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Reviews: {medicine._count.review}</span>
              <span>{new Date(medicine?.createdAt!).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
