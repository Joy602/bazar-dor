"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Challenge C3: Update Information using BetterAuth updateUser
      const { error } = await authClient.updateUser({
        name,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করতে সমস্যা হয়েছে");
      } else {
        toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
      }
    } catch (err) {
      toast.error("কোথাও কোনো ভুল হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 font-bold text-2xl rounded-2xl flex items-center justify-center">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {session?.user?.name || "ইউজার"}
              </h2>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="border border-rose-200 text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-xl text-xs font-semibold transition"
          >
            ← সাইন আউট
          </button>
        </div>

        {/* Update Information Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">তথ্য</h3>

          <form onSubmit={handleUpdateName} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                নাম
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 rounded-xl text-sm transition shadow-sm disabled:opacity-50"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
