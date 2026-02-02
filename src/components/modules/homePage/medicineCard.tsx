"use client";

import Image from "next/image";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";

type Medicine = {
  id: string;
  title: string;
  image: string;
  stock: number;
  price: number;
  _count: {
    review: number;
  };
};

export default function MedicineCard({ medicine }: { medicine: Medicine }) {
  const lowStock = medicine.stock <= 2;

  return (
    <div className="group rounded-2xl border  bg-white  shadow-sm hover:shadow-lg transition">
      {/* IMAGE */}
      <div className="relative aspect-square rounded-t-xl overflow-hidden bg-gray-50">
        <Image
          src={medicine.image}
          alt={medicine.title}
          fill
          className="object-cover group-hover:scale-105 transition"
        />

        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${
            lowStock
              ? "bg-red-100 text-red-600"
              : "bg-emerald-100 text-emerald-600"
          }`}
        >
          {lowStock ? "Low Stock" : "In Stock"}
        </span>
      </div>

      {/* CONTENT */}
      <div className="mt-4 p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {medicine.title}
        </h3>

        {/* REVIEWS */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>{medicine._count.review} reviews</span>
        </div>

        {/* PRICE + CART */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-emerald-600">
            ৳ {medicine.price}
          </p>
          <Link href={`/medicine/${medicine?.id}`}>
            <button className="flex items-center cursor-pointer gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition">
              See Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
