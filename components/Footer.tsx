import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div>
          <span className="font-semibold text-gray-700">বাজার দর</span> —
          প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>
        <div>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</div>
      </div>
    </footer>
  );
}
