"tsx";
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  // ক্যাটাগরি লিস্ট (ডিজাইন অনুযায়ী)
  const categories = [
    { name: "চাল", slug: "chal", icon: "🍚" },
    { name: "ডাল", slug: "dal", icon: "🫘" },
    { name: "তেল", slug: "oil", icon: "🫙" },
    { name: "সবজি", slug: "vegetables", icon: "🥬" },
    { name: "মাছ", slug: "fish", icon: "🐟" },
    { name: "মাংস", slug: "meat", icon: "🥩" },
    { name: "ডিম-দুধ", slug: "egg-milk", icon: "🥛" },
    { name: "মসলা", slug: "spices", icon: "🌶️" },
  ];

  // মারকিউ বা প্রাইজ টিকারের ডেমো ডাটা
  const tickerItems = [
    { name: "স্বর্ণমাছি চাল", price: "১৪৮ টাকা/কেজি", change: "▲ ২.১%" },
    { name: "মিনিকেট চাল", price: "৯৯ টাকা/কেজি", change: "▼ ২.৯%" },
    { name: "বাটাম সাইজ চাল", price: "৬৬ টাকা/কেজি", change: "▲ ৩.১%" },
    { name: "মসুর ডাল", price: "১৪২ টাকা/কেজি", change: "▲ ২.৯%" },
    { name: "ছোলা", price: "১২০ টাকা/কেজি", change: "▼ ২.৪%" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* টপ রো: লোগো ও ইউজার অথ বাটন */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* লোগো ও বাংলা তারিখ */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-emerald-700 text-white p-2 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">বাজার দর</span>
            <p className="text-xs text-gray-500">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
          </div>
        </Link>

        {/* ডানপাশের সাইন ইন / সাইন আপ বাটন */}
        <div className="flex items-center gap-3">
          <Link
            href="/signin"
            className="text-sm font-medium text-gray-700 hover:text-emerald-600 px-3 py-1.5"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* সেকেন্ড রো: ক্যাটাগরি নেভিগেশন লিংক */}
      <div className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-6 overflow-x-auto py-2.5 no-scrollbar">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200/60"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* প্রাইস টিকার (Marquee) */}
      <div className="bg-gray-100 border-t border-gray-200 overflow-hidden py-2">
        <div className="flex animate-marquee whitespace-nowrap gap-8 text-xs text-gray-700">
          {tickerItems.concat(tickerItems).map((item, index) => (
            <div key={index} className="flex items-center gap-2 px-3">
              <span className="font-semibold text-gray-900">{item.name}</span>
              <span>{item.price}</span>
              <span
                className={`font-medium ${
                  item.change.startsWith("▲")
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
