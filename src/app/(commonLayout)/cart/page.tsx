"use client";

import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"; // install lucide-react if not present
import Link from "next/link";
import { useEffect, useState } from "react";
import { cartService } from "@/components/service/add-cart.service";
import { orderStatusService } from "@/components/service/order-status.service";
import { useRouter } from "next/navigation";

// Types from your JSON
type CartItem = {
  id: string;
  quantity: number;
  price: number;
  medicine: {
    title: string;
    image: string;
    stock: number;
  };
};

export default function CartPage() {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const router = useRouter();

  const handleCreateOrder = async () => {
    try {
      await orderStatusService.addOrder();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await cartService.getCartItems();
        setCarts(cartData?.data?.data?.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  const subtotal = carts?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const total = subtotal;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-xl text-green-600 lg:text-3xl font-bold mb-8 flex items-center gap-3">
          <ShoppingBag className="text-green-600" /> My Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 1. Item List (Left Side) */}
          <div className="lg:col-span-2 space-y-4">
            {carts?.length > 0 ? (
              carts?.map((item) => (
                <div
                  key={item?.id}
                  className="bg-white p-4 rounded-xl shadow-sm border flex flex-col sm:flex-row items-center gap-4 transition-hover hover:shadow-md"
                >
                  {/* Medicine Image */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item?.medicine?.image}
                      alt={item?.medicine?.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-800 capitalize">
                      {item?.medicine?.title}
                    </h3>
                    <p className="text-blue-600 font-bold">${item?.price}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Stock: {item?.medicine?.stock} available
                    </p>
                  </div>

                  {/* Subtotal & Delete */}
                  <div className="text-right flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-1">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item?.price * item?.quantity)?.toFixed(2)}
                    </p>
                    <button className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-10 rounded-xl text-center border">
                <p className="text-gray-500">Your cart is empty.</p>
              </div>
            )}
          </div>

          {/* 2. Order Summary (Right Side) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">
                Order Summary
              </h2>

              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900"></span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-blue-600">${total?.toFixed(2)}</span>
                </div>
                <h3 className="text-xl w-full flex justify-center items-center py-3.5 rounded-2xl shadow md:text-2xl text-green-600">
                  Cash on delevary.
                </h3>
              </div>

              <button
                onClick={() => {
                  handleCreateOrder();
                }}
                className="w-full mt-8 bg-green-900 text-white py-2 rounded-xl font-bold text- hover:bg-green-800 transition-all shadow-lg active:scale-95"
              >
                Order now
              </button>

              <p className="text-xs text-center text-gray-400 mt-4">
                Secure Checkout Powered by SSL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
