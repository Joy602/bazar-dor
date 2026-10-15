import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toBengaliNumber } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

async function getProductDetail(id: string) {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
      { next: { revalidate: 60 } },
    );
    const data = await res.json();
    return data?.data || data || null;
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductDetail(slug);

  // যদি প্রোডাক্ট না পাওয়া যায় (404-style state)
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            প্রোডাক্টটি পাওয়া যায়নি
          </h2>
          <p className="text-gray-500 mb-6">
            অনুরোধকৃত পণ্যটি মুছে ফেলা হয়েছে অথবা লিংকটি ভুল।
          </p>
          <Link
            href="/"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl transition"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // ডেমো বাজারভিত্তিক ডাটা (যদি এপিআই থেকে না আসে তার ফলব্যাকসহ)
  const bazarPrices = product.markets || [
    { bazar: "মঠ বাজার", division: "ময়মনসিংহ", min: 59, max: 65, avg: 62 },
    { bazar: "সদর বাজার", division: "রাজশাহী", min: 60, max: 66, avg: 63 },
    { bazar: "বাজারহাট", division: "খুলনা", min: 60, max: 67, avg: 63.5 },
    { bazar: "বাসারহাট বাজার", division: "রাজশাহী", min: 60, max: 68, avg: 64 },
    { bazar: "চৌর বাজার", division: "ময়মনসিংহ", min: 60, max: 69, avg: 68.5 },
    {
      bazar: "গ্রীন মার্কেট, মিরপুর",
      division: "ঢাকা",
      min: 58,
      max: 75,
      avg: 67.5,
    },
    { bazar: "কারওয়ান বাজার", division: "ঢাকা", min: 52, max: 73, avg: 69 },
  ];

  const price = product.price ?? 66;
  const change = product.change ?? 3.1;
  const isUp = change > 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-emerald-600">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link
            href={`/category/${product.category || "chal"}`}
            className="hover:text-emerald-600"
          >
            {product.categoryName || "চাল"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-800 font-semibold">{product.name}</span>
        </div>

        {/* Top Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
              {product.emoji || "🍚"}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {product.unit || "প্রতি কেজি"} — {product.categoryName || "চাল"}
              </p>
              <p className="text-xs text-gray-600 mt-2 bg-gray-50 px-3 py-1.5 rounded-lg inline-block border border-gray-100">
                গতকালের তুলনায় আজ দাম {isUp ? "বেড়েছে" : "কমেছে"} ·{" "}
                {toBengaliNumber(Math.abs(change))} টাকা
              </p>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl text-right min-w-[160px]">
            <span className="text-xs text-emerald-800 font-medium block">
              আজকের দাম
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-0.5">
              {toBengaliNumber(price)}{" "}
              <span className="text-sm font-normal text-gray-600">টাকা</span>
            </div>
            <div
              className={`text-xs font-semibold mt-1 flex items-center justify-end gap-1 ${isUp ? "text-emerald-700" : "text-rose-600"}`}
            >
              <span>{isUp ? "▲" : "▼"}</span>
              <span>{toBengaliNumber(Math.abs(change))}%</span>
            </div>
          </div>
        </div>

        {/* Price Summary Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-xs text-gray-400 font-medium">
                সর্বনিম্ন দাম
              </span>
              <div className="text-2xl font-bold text-emerald-700 mt-1">
                {toBengaliNumber(59)} টাকা
              </div>
              <p className="text-xs text-gray-500 mt-1">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-xs text-gray-400 font-medium">
                সর্বাধিক দাম
              </span>
              <div className="text-2xl font-bold text-rose-600 mt-1">
                {toBengaliNumber(73)} টাকা
              </div>
              <p className="text-xs text-gray-500 mt-1">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-xs text-gray-400 font-medium">গড় দাম</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                {toBengaliNumber(price)} টাকা
              </div>
              <p className="text-xs text-gray-500 mt-1">প্রতি কেজি-এর হিসাব</p>
            </div>
          </div>
        </div>

        {/* Bazar-wise Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100 text-xs sm:text-sm text-gray-600 font-semibold">
                    <th className="py-4 px-6">বাজার</th>
                    <th className="py-4 px-6">বিভাগ</th>
                    <th className="py-4 px-6">সর্বনিম্ন</th>
                    <th className="py-4 px-6">সর্বাধিক</th>
                    <th className="py-4 px-6">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-gray-700">
                  {bazarPrices.map((item: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-3.5 px-6 font-medium text-gray-900">
                        {item.bazar}
                      </td>
                      <td className="py-3.5 px-6 text-gray-500">
                        {item.division}
                      </td>
                      <td className="py-3.5 px-6">
                        {toBengaliNumber(item.min)} টাকা
                      </td>
                      <td className="py-3.5 px-6">
                        {toBengaliNumber(item.max)} টাকা
                      </td>
                      <td className="py-3.5 px-6 font-semibold text-gray-900">
                        {toBengaliNumber(item.avg)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
