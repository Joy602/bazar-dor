"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { parseBengaliNumber, toBengaliNumber } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface Product {
  id: number | string;
  name: string;
  price?: number;
  change?: number;
  unit?: string;
  emoji?: string;
  category?: string;
}

const categoryIcons: Record<string, string> = {
  chal: "🍚",
  dal: "🫘",
  oil: "🫙",
  vegetables: "🥬",
  fish: "🐟",
  meat: "🥩",
  "egg-milk": "🥛",
  spices: "🌶️",
};

const categoryNames: Record<string, string> = {
  chal: "চাল",
  dal: "ডাল",
  oil: "তেল",
  vegetables: "সবজি",
  fish: "মাছ",
  meat: "মাংস",
  "egg-milk": "ডিম-দুধ",
  spices: "মসলা",
};

export default function CategoryClient({
  slug,
  initialProducts,
}: {
  slug: string;
  initialProducts: Product[];
}) {
  const [sortOption, setSortOption] = useState<string>("default");

  const categoryTitle = categoryNames[slug] || slug;
  const categoryIcon = categoryIcons[slug] || "🛒";

  // C1: Bangla Numerals Correct Numeric Sorting
  const sortedProducts = [...initialProducts].sort((a, b) => {
    const priceA = parseBengaliNumber(a.price ?? 0);
    const priceB = parseBengaliNumber(b.price ?? 0);

    if (sortOption === "lowToHigh") {
      return priceA - priceB;
    } else if (sortOption === "highToLow") {
      return priceB - priceA;
    }
    return 0; // default order
  });

  // Empty State Handling
  if (!initialProducts || initialProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          কোনো পণ্য পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 mb-6">
          এই ক্যাটাগরিতে বর্তমানে কোনো তথ্য নেই।
        </p>
        <Link
          href="/"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Category Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex items-center gap-5">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-4xl">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {categoryTitle}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {toBengaliNumber(initialProducts.length)}টি পণ্যের আজকের দাম ও
            পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
        <span className="text-xs sm:text-sm text-gray-500 font-medium">
          মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </span>

        {/* C1 Requirement: Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs sm:text-sm font-medium text-gray-600">
            সাজান:
          </label>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-800 text-xs sm:text-sm font-medium rounded-xl px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="lowToHigh">দাম: কম থেকে বেশি</option>
              <option value="highToLow">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
