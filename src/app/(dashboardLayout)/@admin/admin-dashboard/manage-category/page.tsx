"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";

export default function CategoryManagePage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !image) {
      return toast.error("All fields are required");
    }

    const toastId = toast.loading("Creating category...");
    setLoading(true);

    try {
      const res = await fetch(`${CLIENT_BACKEND_URL}/api/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          image,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Category created successfully", {
        id: toastId,
      });

      setName("");
      setImage("");
    } catch (error) {
      toast.error("Failed to create category", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 mx-auto lg:min-w-xl min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800">Manage Categories</h1>
        <p className="text-sm text-gray-500">Create new medicine categories</p>
      </div>

      <div className="max-w-lg bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Ex: Skin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://i.ibb.co/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition disabled:opacity-60"
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
}
