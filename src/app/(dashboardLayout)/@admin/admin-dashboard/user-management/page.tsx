"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";
import { userManageService } from "@/components/service/get-user.service";
export type UserStatus = "ACTIVE" | "BANNED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  status: UserStatus;
  createdAt: string;
  emailVerified: boolean;
  image: string;
  isBanned: boolean;
  updatedAt: string;
}

const statusOptions: UserStatus[] = ["ACTIVE", "BANNED"];

export default function UserManageTable() {
  const [statusMap, setStatusMap] = useState<Record<string, UserStatus>>({});
  const [users, setUsers] = useState<User[]>([]);

  const handleStatusChange = (id: string, status: UserStatus) => {
    setStatusMap((prev) => ({ ...prev, [id]: status }));
  };

  const handleUpdateStatus = async (id: string) => {
    const status = statusMap[id];
    const toastId = toast.loading("Updating user status...");

    try {
      const res = await fetch(
        `${CLIENT_BACKEND_URL}/api/user/admin-status/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status }),
        },
      );

      if (!res.ok) throw new Error();

      toast.success("User status updated", { id: toastId });
    } catch {
      toast.error("Failed to update status", { id: toastId });
    }
  };

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const user = await userManageService.getAllUsers();
        console.log(user);
        setUsers(user as User[]);
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
        <h1 className="text-2xl font-bold text-green-800">User Management</h1>
        <p className="text-sm text-gray-500">
          View users and update status only
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded bg-gray-200">
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <select
                    value={statusMap[user.id] ?? user.status}
                    onChange={(e) =>
                      handleStatusChange(user.id, e.target.value as UserStatus)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => handleUpdateStatus(user.id)}
                    className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                {user.role}
              </span>

              <select
                value={statusMap[user.id] ?? user.status}
                onChange={(e) =>
                  handleStatusChange(user.id, e.target.value as UserStatus)
                }
                className="border rounded px-2 py-1 text-sm"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleUpdateStatus(user.id)}
              className="mt-3 w-full bg-emerald-600 text-white py-1.5 rounded"
            >
              Update Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
