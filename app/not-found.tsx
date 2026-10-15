import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="text-7xl font-extrabold text-emerald-700 mb-4">৪০৪</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-sm text-gray-500 max-w-md mb-8">
          আপনি যে পেজটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি ভুল রয়েছে।
        </p>

        <Link
          href="/"
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 py-3 rounded-xl transition shadow-sm"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>

      <Footer />
    </div>
  );
}
