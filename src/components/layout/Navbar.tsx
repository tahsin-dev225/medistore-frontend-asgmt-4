"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, UserRoundPlus } from "lucide-react";
import { getUsers } from "@/actions/user.action";
// import { logOutUser } from "@/actions/logout.action";
import { authClient } from "@/lib/auth-client";

export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED";

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [error, setError] = useState<{ message: string } | null>(null);

  const logout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  console.log(user);

  useEffect(() => {
    (async () => {
      const { data, error } = await getUsers();
      setUser(data?.user);
      setError(error);
    })();
  }, []);

  return (
    <header className="w-full max-w-[1500px] mx-auto border-b bg-white">
      <div className=" mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white font-bold">
              +
            </span>
            <span className="text-xl font-bold text-gray-900">
              Med<span className="text-emerald-500">store</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] text-gray-600 font-medium">
            <Link href="/" className="hover:text-emerald-500">
              Home
            </Link>
            <Link href="/medicine" className="hover:text-emerald-500">
              Shop Medicine
            </Link>
            {user && (
              <Link href="/dashboard" className="hover:text-emerald-500">
                Dashboard
              </Link>
            )}
          </nav>

          {/* RIGHT ICONS */}
          <div className="hidden md:flex h-8 items-center gap-5 text-gray-600">
            {user ? (
              <Link
                className="px-1.5 size-8 flex  border border-black/50 rounded-full justify-center items-center"
                href={"/login"}
              >
                <User className=" cursor-pointer hover:text-emerald-500" />
              </Link>
            ) : (
              <Link
                className="px-1.5 size-8 flex  border border-black/50 rounded-full justify-center items-center"
                href={"/login"}
              >
                <UserRoundPlus className=" cursor-pointer hover:text-emerald-500" />
              </Link>
            )}
            {user?.role === "CUSTOMER" && (
              <Link href={"/cart"}>
                <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-emerald-500" />
              </Link>
            )}

            {user && (
              <button
                className="px-3 py-1.5 rounded-2xl border "
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </button>
            )}
          </div>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-6 py-4 flex flex-col  space-y-4 text-gray-700 font-medium">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/medicines" onClick={() => setOpen(false)}>
              Shop Medicine
            </Link>
            {user && (
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            )}
            <div className="flex items-center gap-4 pt-4 border-t">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <Link
              className="px-1.5 size-8 flex  border border-black/50 rounded-full justify-center items-center"
              href={"/login"}
            >
              <UserRoundPlus className=" cursor-pointer hover:text-emerald-500" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
