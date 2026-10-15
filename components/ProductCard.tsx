"use client";

import Link from "next/link";
import { toBengaliNumber } from "@/lib/utils";

interface Product {
  [key: string]: any;
}

export default function ProductCard({ product }: { product: Product }) {
  if (!product) return null;

  // ১. ID বের করা
  const id = product.id || product._id || product.slug || "1";

  // ২. প্রোডাক্টের নাম (সব ধরণের ফিল্ড চেক করা)
  const name =
    product.name ||
    product.product_name ||
    product.title ||
    product.নাম ||
    product.পণ্যের_নাম ||
    "নামহীন পণ্য";

  // ৩. দাম (সব ধরণের ফিল্ড চেক করা)
  const rawPrice =
    product.price ??
    product.current_price ??
    product.today_price ??
    product.দাম ??
    product.আজকের_দাম ??
    0;
  const price =
    typeof rawPrice === "number" ? rawPrice : parseFloat(rawPrice) || 0;

  // ৪. দামের পরিবর্তন % (সব ধরণের ফিল্ড চেক করা)
  const rawChange =
    product.change ??
    product.price_change ??
    product.percent ??
    product.পরিবর্তন ??
    0;
  const change =
    typeof rawChange === "number" ? rawChange : parseFloat(rawChange) || 0;

  // ৫. ইউনিট (প্রতি কেজি / প্রতি লিটার)
  const unit = product.unit || product.একক || "kg";

  // ৬. ইমোজি / আইকন
  const emoji = product.emoji || product.icon || product.ছবি || "🛒";

  const isUp = change > 0;
  const isDown = change < 0;

  return (
    <Link
      href={`/product/${id}`}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
          {emoji}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {unit.startsWith("প্রতি") ? unit : `প্রতি ${unit}`}
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
