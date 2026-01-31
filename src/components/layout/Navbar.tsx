"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, UserRoundPlus } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full max-w-[1500px] border-b bg-white">
      <div className=" mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white font-bold">
              +
            </span>
            <span className="text-xl font-bold text-gray-900">
              Med<span className="text-emerald-500">shop</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
            <Link href="/" className="hover:text-emerald-500">
              Home
            </Link>
            <Link href="/about" className="hover:text-emerald-500">
              About Us
            </Link>
            <Link href="/medicine" className="hover:text-emerald-500">
              Shop Medicine
            </Link>
            {
              // user &&
              <Link href="/dashboard" className="hover:text-emerald-500">
                Dashboard
              </Link>
            }
          </nav>

          {/* RIGHT ICONS */}
          <div className="hidden md:flex h-8 items-center gap-5 text-gray-600">
            <Link href={"/profile"}>
              <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-emerald-500" />
            </Link>
            <Link
              className="px-1.5 size-8 flex  border border-black/50 rounded-full justify-center items-center"
              href={"/login"}
            >
              <UserRoundPlus className=" cursor-pointer hover:text-emerald-500" />
            </Link>
            <Link
              className="px-1.5 size-8 flex  border border-black/50 rounded-full justify-center items-center"
              href={"/cart"}
            >
              <User className=" cursor-pointer hover:text-emerald-500" />
            </Link>
          </div>
          {/* MOBILE MENU BUTTON */}
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
          <div className="px-6 py-4 space-y-4 text-gray-700 font-medium">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              About Us
            </Link>
            <Link href="/medicines" onClick={() => setOpen(false)}>
              Shop Medicine
            </Link>
            <div className="flex items-center gap-4 pt-4 border-t">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
