"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import { env } from "@/env";

export const CLIENT_BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export default function CategorySlider() {
  const [categories, setCategories] = useState<any>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${CLIENT_BACKEND_URL}/api/category`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto my-8 px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-14">
        What Medicine Do You Need?
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 7 },
        }}
      >
        {categories?.map((cat) => (
          <SwiperSlide key={cat?.name}>
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-200 group-hover:border-emerald-500 transition">
                <Image
                  src={cat?.image}
                  alt={cat?.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-emerald-600">
                {cat?.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
