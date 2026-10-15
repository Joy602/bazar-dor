"use client";

import Image from "next/image";

export default function Hero() {
  const scrollToProducts = () => {
    const section = document.getElementById("সব-পণ্য");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-emerald-50/50 py-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-100/50">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-emerald-100 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        {/* Left Side Content */}
        <div className="space-y-4 max-w-2xl text-left">
          <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <button
              onClick={scrollToProducts}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 py-3 rounded-xl transition shadow-sm cursor-pointer"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="flex justify-center items-center w-full md:w-auto">
          <div className="w-48 h-48 sm:w-64 sm:h-64 relative flex items-center justify-center">
            {/* Standard SVG Illustration for Fruit/Veggie Basket */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Basket */}
              <path
                d="M40 110 L160 110 L145 170 C143 178 135 184 125 184 L75 184 C65 184 57 178 55 170 Z"
                fill="#8B4513"
              />
              <path
                d="M35 102 C35 98 38 95 42 95 L158 95 C162 95 165 98 165 102 L165 110 L35 110 Z"
                fill="#A0522D"
              />
              {/* Vegetables/Fruits */}
              <circle cx="70" cy="85" r="22" fill="#FF4500" />
              <circle cx="100" cy="70" r="26" fill="#22C55E" />
              <circle cx="130" cy="85" r="20" fill="#EAB308" />
              <circle cx="115" cy="92" r="18" fill="#A855F7" />
              <path d="M95 48 Q100 35 110 40 Q105 52 95 48 Z" fill="#15803D" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
