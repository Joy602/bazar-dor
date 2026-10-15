"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
      }
    } catch (err) {
      toast.error("কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6 text-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm text-left space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ইমেইল
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  required
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 rounded-xl text-sm transition shadow-sm disabled:opacity-50"
              >
                {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
              </button>
            </form>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-3 text-xs text-gray-400 font-medium absolute">
                অথবা
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialSignIn("google")}
                className="flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <span>Google দিয়ে চালিয়ে যান</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignIn("github")}
                className="flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <span>GitHub দিয়ে চালিয়ে যান</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                অ্যাকাউন্ট নেই?{" "}
                <Link
                  href="/signup"
                  className="text-emerald-700 font-semibold hover:underline"
                >
                  সাইন আপ করুন
                </Link>
              </p>
            </div>
          </div>

          <div>
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-gray-800"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
