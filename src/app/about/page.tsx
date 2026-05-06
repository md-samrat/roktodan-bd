import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm md:text-2xl font-semibold text-[var(--color-primary)] uppercase tracking-widest">
            আমাদের সম্পর্কে
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--color-text-main)]">
            রক্তদান — কুমিল্লা রক্তসেবা প্ল্যাটফর্ম
          </h1>

          <p className="mt-5 max-w-3xl mx-auto text-[var(--color-text-soft)] leading-8 text-lg">
            রক্তদান একটি স্থানীয় অনলাইন প্ল্যাটফর্ম যেখানে কুমিল্লার বিভিন্ন
            উপজেলার মানুষ একসাথে যুক্ত হয়ে জরুরি মুহূর্তে দ্রুত রক্তদাতা খুঁজে
            পেতে সাহায্য করে। আমাদের লক্ষ্য হলো সময়মতো রক্ত পৌঁছে দিয়ে জীবন
            বাঁচানো।
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--color-text-main)]">
              আমাদের লক্ষ্য
            </h2>
            <p className="mt-4 text-[var(--color-text-soft)] leading-8">
              কুমিল্লার প্রতিটি উপজেলার মানুষের জন্য একটি নির্ভরযোগ্য রক্তদাতা
              নেটওয়ার্ক তৈরি করা, যাতে জরুরি সময়ে দ্রুত সঠিক রক্তদাতা পাওয়া যায়।
            </p>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--color-text-main)]">
              আমাদের উদ্দেশ্য
            </h2>
            <p className="mt-4 text-[var(--color-text-soft)] leading-8">
              সচেতনতা বৃদ্ধি, স্বেচ্ছায় রক্তদানকে উৎসাহিত করা এবং প্রযুক্তির মাধ্যমে
              রক্তদাতা ও রোগীর মধ্যে সহজ যোগাযোগ তৈরি করা।
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-[var(--color-text-main)] mb-10">
            কেন রক্তদান?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="text-5xl">⚡</div>
              <h3 className="mt-4 text-xl font-semibold">দ্রুত সেবা</h3>
              <p className="mt-3 text-[var(--color-text-soft)] leading-7">
                জরুরি মুহূর্তে দ্রুত রক্তদাতা খুঁজে পাওয়ার সহজ ব্যবস্থা।
              </p>
            </div>

            <div className="card text-center">
              <div className="text-5xl">📍</div>
              <h3 className="mt-4 text-xl font-semibold">স্থানীয় নেটওয়ার্ক</h3>
              <p className="mt-3 text-[var(--color-text-soft)] leading-7">
                কুমিল্লার বিভিন্ন এলাকার মানুষদের নিয়ে গড়ে ওঠা বিশ্বস্ত প্ল্যাটফর্ম।
              </p>
            </div>

            <div className="card text-center">
              <div className="text-5xl">🩸</div>
              <h3 className="mt-4 text-xl font-semibold">জীবন বাঁচানো</h3>
              <p className="mt-3 text-[var(--color-text-soft)] leading-7">
                প্রতিটি রক্তদান একটি নতুন জীবনের আশার আলো।
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="card text-center py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-main)]">
            আপনিও রক্তদাতা হিসেবে যুক্ত হোন
          </h2>

          <p className="mt-4 text-[var(--color-text-soft)] max-w-2xl mx-auto leading-8">
            আপনার সামান্য উদ্যোগ কারো জীবনের সবচেয়ে বড় সহায়তা হতে পারে। আজই
            রেজিস্ট্রেশন করুন এবং মানবতার পাশে দাঁড়ান।
          </p>

          <div className="mt-8">
            <Link href="/register">
              <button className="btn-primary">
                এখনই রেজিস্ট্রেশন করুন
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}