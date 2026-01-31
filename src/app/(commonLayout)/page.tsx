import Footer from "@/components/layout/Footer";
import HomeBanner from "@/components/layout/HomeBnr";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="">
      <div className="flex relative min-h-screen items-center justify-center w-full">
        <HomeBanner />
        <div className="absolute -z-20 top-48 left-0 size-44 rounded-full blur-3xl bg-green-200"></div>
        <div className="absolute z-20 top-60 right-10 size-44 rounded-full blur-3xl bg-green-200"></div>
      </div>
    </div>
  );
}
