"use client";

import { useEffect, useState } from "react";
import { User, Mail, Shield, Camera, Save, Loader2 } from "lucide-react";
import Image from "next/image";
import { IUser } from "@/components/layout/Navbar";
import { getUsers } from "@/actions/user.action";
import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name);

  const [image, setImage] = useState(user?.image);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await getUsers();
      setUser(data.user);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Updating profile...");

    if (!name || !image) {
      return toast.error("Nothing to update", { id: toastId });
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${CLIENT_BACKEND_URL}/api/user/profile/${user?.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, image }),
        },
      );
      if (!res.ok) throw new Error();

      toast.success("Profile updated successfully", { id: toastId });
      router.push("/dashboard/my-profile");
    } catch (error) {
      toast.error("Failed to update profile", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 text-sm">
          Update your profile information and how others see you.
        </p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {/* Header/Cover Placeholder */}
        <div className="h-32 bg-linear-to-r from-blue-500 to-indigo-600"></div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 -mt-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left: Avatar Upload */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-gray-100 relative">
                {image ? (
                  <Image
                    src={image}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <User size={48} />
                  </div>
                )}
                {user?.image && (
                  <Image
                    src={user?.image}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            {/* Right: Form Fields */}
            <div className="grow w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-6">
                <div className="">
                  <h3 className="text-lg py-2 uppercase text-amber-900 font-semibold rounded-lg px-3">
                    Name : {user?.name}
                  </h3>
                </div>
                {/* Email Field (Read Only) */}
                <div className="space-y-2">
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* IMAGE */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://i.ibb.co/..."
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* Role (Read Only) */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Shield size={16} /> Account Role
                  </label>
                  <div className="px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-600 flex items-center justify-between">
                    <span className="text-sm font-medium uppercase tracking-wider">
                      {user?.role}
                    </span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                      {user?.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t flex justify-end gap-4">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-70 flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
