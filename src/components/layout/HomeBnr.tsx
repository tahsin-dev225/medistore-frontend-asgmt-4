import Image from "next/image";

export default function HomeBanner() {
  return (
    <section className="relative lg:max-w-[1000px] xl:max-w-[1280px]  overflow-hidden">
      <div className=" mx-aut px-2.5 sm:px-3 md:px-4 lg:px-6 py-3 md:py-12 lg:py-20">
        <div className="flex flex-col-reverse sm:flex-row items-center gap-10">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Buy Genuine <span className="text-amber-400">Medicines</span>{" "}
              <br />
              Online at Best Price
            </h1>

            <p className="text-sm font-semibold mt-6 text-emerald-600 mb-3">
              Your Trusted and qualityfull Online Pharmacy <br />
              And Fast Home Delivery
            </p>

            <button className="mt-8 inline-flex items-center rounded-md bg-green-500 px-6 py-3 text-white font-semibold hover:bg-green-600 transition">
              Buy Now
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">
            <Image
              src="/img/bnr-medi.png"
              alt="Blood Pressure Monitor"
              width={590}
              height={590}
              className="relative z-10"
              priority
            />

            {/* Floating icons */}
            <span className="absolute top-10 left-10 text-blue-400 text-xl">
              △
            </span>
            <span className="absolute bottom-10 right-16 text-red-400 text-xl">
              ✕
            </span>
            <span className="absolute top-1/2 right-0 text-blue-500 text-xl">
              ▢
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
