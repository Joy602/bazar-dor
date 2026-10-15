"use client";

import Link from "next/link";
import { toBengaliNumber } from "@/lib/utils";

interface Product {
  id: number | string;
  name: string;
  slug?: string;
  category?: string;
  unit?: string;
  emoji?: string;
  price?: number;
  change?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const price = product.price ?? 0;
  const change = product.change ?? 0;
  const isUp = change > 0;
  const isDown = change < 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
          {product.emoji || "🛒"}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {product.unit || "প্রতি কেজি"}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between pt-3 border-t border-gray-50">
        <div>
          <span className="text-xs text-gray-400 block font-medium">
            আজকের দাম
          </span>
          <span className="text-lg font-bold text-gray-900">
            {toBengaliNumber(price)} টাকা
          </span>
        </div>

        {/* Change Badge */}
        <div
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
            isUp
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
              : isDown
                ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                : "bg-gray-100 text-gray-600 border border-gray-200/60"
          }`}
        >
          {isUp && "▲"} {isDown && "▼"} {!isUp && !isDown && "—"}
          <span>{toBengaliNumber(Math.abs(change).toFixed(1))}%</span>
        </div>
      </div>
    </Link>
  );
}
