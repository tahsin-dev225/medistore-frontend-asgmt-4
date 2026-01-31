import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b0f14] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 pb-3 pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* LOGO + DESC */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white font-bold shadow-lg">
                +
              </span>
              <span className="text-xl font-bold text-white">
                Med<span className="text-emerald-500">shop</span>
              </span>
            </Link>

            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm">
              Your trusted online pharmacy for genuine medicines, healthcare
              products and fast home delivery.
            </p>

            <div className="mt-5 flex gap-4">
              <Social icon={<Facebook size={18} />} />
              <Social icon={<Twitter size={18} />} />
              <Social icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold text-white mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-emerald-400 transition"
                >
                  Shop Medicine
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-emerald-400 transition"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold text-white mb-5 tracking-wide">
              Contact
            </h4>

            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>support@medshop.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Medshop. Crafted with care.
        </div>
      </div>
    </footer>
  );
}

const Social = ({ icon }: { icon: React.ReactNode }) => (
  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-400/10 cursor-pointer transition">
    {icon}
  </span>
);
