"use client";

import { useEffect, useState } from "react";
import MedicineCard from "../modules/homePage/medicineCard";
import { CLIENT_BACKEND_URL } from "./home-category";
import { Button } from "../ui/button";
import Link from "next/link";

const medicines = [
  {
    id: "49059c55-7a11-4088-b9bc-98a8c7b9cfc8",
    title: "Medicin for ki",
    image: "https://i.ibb.co.com/m5pwzjNq/pexels-pixabay-248412.jpg",
    stock: 6,
    price: 20,
    _count: { review: 0 },
  },
];

export default function HomeMedicines() {
  const [medicine, setMedicine] = useState<any>(null);

  console.log(medicine);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const res = await fetch(`${CLIENT_BACKEND_URL}/api/medicine`);
        const data = await res.json();
        setMedicine(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicine();
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <h2 className="text-2xl md:text-3xl lg:text-4xl  text-center mx-auto font-bold text-gray-900 mb-14">
        Popular Medicines
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {medicine?.data?.map((medicineItem) => (
          <MedicineCard key={medicineItem.id} medicine={medicineItem} />
        ))}
      </div>
      <div className="flex w-full justify-center my-14">
        <Link href={"/medicine"}>
          <Button>See All Medicines</Button>
        </Link>
      </div>
    </section>
  );
}
