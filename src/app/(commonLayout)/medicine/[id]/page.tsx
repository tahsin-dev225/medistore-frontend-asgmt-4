"use client";

import Image from "next/image";
import { useState } from "react";

// Types based on your JSON
type Category = {
  id: string;
  name: string;
  image: string;
};

type Review = {
  id: string;
  content: string;
  createdAt: string;
};

type MedicineDetail = {
  id: string;
  title: string;
  image: string;
  stock: number;
  price: number;
  category: Category;
  review: Review[];
};

export default function MedicineDetailsPage() {
  // Mocking the medicine data from your JSON
  const medicine: MedicineDetail = {
    id: "f7f1780b-7b7e-446e-a295-92ffd0be5542",
    title: "Medicin for kashi",
    image: "https://i.ibb.co.com/m5pwzjNq/pexels-pixabay-248412.jpg",
    stock: 6,
    price: 20,
    category: {
      id: "3d2f5905-9765-4bb0-b571-9b64ec021082",
      name: "cough",
      image: "https://i.ibb.co.com/39PhBZjK/cough.jpg",
    },
    review: [
      {
        id: "01KGD0DD6YDW8Z02SX2BTAXNRK",
        content: "kashi is very good its a review for kashi",
        createdAt: "2026-02-01T16:26:13.085Z",
      },
    ],
  };

  const [newReview, setNewReview] = useState("");

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review Submitted:", newReview);
    setNewReview(""); // Reset input
    alert("Review submitted successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Product Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Medicine Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden border bg-gray-50 shadow-sm">
          <Image
            src={medicine.image}
            alt={medicine.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider">
              {medicine.category.name}
            </span>
            <span
              className={`text-sm ${medicine.stock > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {medicine.stock > 0
                ? `In Stock (${medicine.stock})`
                : "Out of Stock"}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 capitalize">
            {medicine.title}
          </h1>

          <div className="text-2xl font-bold text-blue-600">
            ${medicine.price.toFixed(2)}
          </div>

          <p className="text-gray-600 leading-relaxed">
            This medicine is specifically formulated for{" "}
            {medicine.category.name}. Please consult a doctor before use.
          </p>

          <button className="mt-4 w-full md:w-max px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95">
            Add to Cart
          </button>
        </div>
      </div>

      <hr className="my-12 border-gray-200" />

      {/* Review Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Existing Reviews */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold mb-6">
            User Reviews ({medicine.review.length})
          </h3>

          <div className="space-y-6">
            {medicine.review.length > 0 ? (
              medicine.review.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 border rounded-xl bg-white shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <span className="font-medium text-gray-800 text-sm">
                      Customer
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">"{rev.content}"</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>
        </div>

        {/* Right: Add Review Form */}
        <div className="bg-gray-50 p-6 rounded-2xl border sticky top-24 h-fit">
          <h4 className="text-xl font-bold mb-4">Write a Review</h4>
          <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
            <textarea
              required
              rows={4}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="How was your experience with this medicine?"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-900 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
