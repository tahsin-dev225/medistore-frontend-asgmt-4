
import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";

export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  isBanned: boolean;
  image: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export const userManageService = {
  getAllUsers: async () => {
    try {
      const res = await fetch(`${CLIENT_BACKEND_URL}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await res.json();

      return users as User[]
    } catch (err) {
      console.error(err);
      return {
        data: null,
        error: { message: "Something went wrong while fetching users" },
      };
    }
  },
};
