import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Image/Icon */}
        <div className="mb-8">
          <div className="w-40 h-40 mx-auto bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
            <span className="text-7xl">🩸</span>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-8xl font-bold text-[var(--color-primary)] mb-4">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি আমাদের সিস্টেমে নেই।
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-green-700 transition">
              হোম পেজে যান
            </button>
          </Link>
          
          <Link href="/donors">
            <button className="px-6 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg font-semibold hover:bg-[var(--color-primary)] hover:text-white transition">
              রক্তদাতা খুঁজুন
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}