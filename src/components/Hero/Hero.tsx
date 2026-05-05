import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* 🧠 Left Content */}
          <div>
            <span className="text-sm px-4 py-2 rounded-full bg-[var(--color-secondary)] text-white font-medium">
              হোমনা • কুমিল্লা রক্তদান নেটওয়ার্ক
            </span>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold text-[var(--color-text-main)] leading-tight">
              আপনার রক্ত পারে <br />
              <span className="text-[var(--color-primary)]">
                একটি জীবন বাঁচাতে
              </span>
            </h1>

            <p className="mt-5 text-[var(--color-text-soft)] text-lg leading-8">
              জরুরি মুহূর্তে দ্রুত রক্তদাতা খুঁজুন অথবা নিজেকে রক্তদাতা হিসেবে
              নিবন্ধন করে অন্যের জীবন বাঁচাতে এগিয়ে আসুন।
            </p>

            {/* 🎯 Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/register">
                <button className="btn-primary">
                  রক্তদাতা হিসেবে যোগ দিন
                </button>
              </Link>

              <Link href="/donors">
                <button className="px-5 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition">
                  রক্তদাতা খুঁজুন
                </button>
              </Link>
            </div>

            {/* ⚡ Small Stats */}
            <div className="mt-10 flex gap-8 text-sm text-[var(--color-text-soft)]">

              <div>
                <p className="text-2xl font-bold text-[var(--color-text-main)]">
                  ১০০+
                </p>
                <p>নিবন্ধিত রক্তদাতা</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-[var(--color-text-main)]">
                  ২৪/৭
                </p>
                <p>জরুরি সহায়তা</p>
              </div>

            </div>
          </div>

          {/* 🖼️ Right Visual Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-[var(--color-bg)] rounded-2xl shadow-lg p-8 text-center card">

              <div className="text-6xl">🩸</div>

              <h2 className="mt-4 text-2xl font-bold text-[var(--color-text-main)]">
                জরুরি রক্ত প্রয়োজন?
              </h2>

              <p className="mt-3 text-[var(--color-text-soft)] leading-7">
                হোমনা এলাকার প্রয়োজনীয় রক্তের গ্রুপ অনুযায়ী দ্রুত রক্তদাতা খুঁজে নিন।
              </p>

              <Link href="/donors">
                <button className="mt-6 w-full btn-primary">
                  এখনই খুঁজুন
                </button>
              </Link>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}