export default function EmergencyPhonePage() {
  const data = {
    hospitals: [
      { name: "হোমনা উপজেলা স্বাস্থ্য কমপ্লেক্স", phone: "(সংযুক্ত করা হবে)" },
      { name: "কুমিল্লা মেডিকেল কলেজ হাসপাতাল", phone: "(সংযুক্ত করা হবে)" },
    ],
    ambulances: [
      { name: "হোমনা লোকাল অ্যাম্বুলেন্স সার্ভিস", phone: "(সংযুক্ত করা হবে)" },
      { name: "প্রাইভেট অ্যাম্বুলেন্স সার্ভিস (২৪/৭)", phone: "(সংযুক্ত করা হবে)" },
    ],
    police: [
      { name: "হোমনা থানা পুলিশ", phone: "999" },
      { name: "জাতীয় জরুরি সেবা (বাংলাদেশ)", phone: "999" },
    ],
    others: [
      { name: "ফায়ার সার্ভিস", phone: "999" },
      { name: "দুর্যোগ ব্যবস্থাপনা সেবা", phone: "1090" },
    ],
  };

  const Card = ({ title, items }: any) => (
    <div className="card hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-4">
        {title}
      </h2>

      <div className="space-y-3">
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            className="flex items-center justify-between border-b pb-3"
          >
            <p className="text-[var(--color-text-main)] font-medium">
              {item.name}
            </p>

            {item.phone === "(সংযুক্ত করা হবে)" ? (
              <span className="text-[var(--color-text-soft)] text-sm">
                শীঘ্রই যুক্ত হবে
              </span>
            ) : (
              <a
                href={`tel:${item.phone}`}
                className="text-[var(--color-primary)] font-semibold hover:underline"
              >
                {item.phone}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm md:text-2xl font-semibold text-[var(--color-primary)] uppercase tracking-widest">
            জরুরি সেবা
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--color-text-main)]">
            জরুরি ফোন নম্বর তালিকা
          </h1>

          <p className="mt-4 text-[var(--color-text-soft)] max-w-2xl mx-auto leading-8">
            হোমনা এলাকার জরুরি হাসপাতাল, অ্যাম্বুলেন্স, পুলিশ ও অন্যান্য সেবার
            গুরুত্বপূর্ণ নম্বরসমূহ এখানে সংযুক্ত করা হয়েছে।
          </p>
        </div>

        {/* Info Banner */}
        <div className="card mb-10 border-l-4 border-[var(--color-primary)]">
          <p className="text-[var(--color-text-main)] font-medium">
            ⚠️ গুরুত্বপূর্ণ: জরুরি প্রয়োজনে সর্বদা জাতীয় জরুরি সেবা 999 নম্বরে কল করুন
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card title="🏥 হাসপাতাল" items={data.hospitals} />
          <Card title="🚑 অ্যাম্বুলেন্স" items={data.ambulances} />
          <Card title="👮 পুলিশ সেবা" items={data.police} />
          <Card title="🔥 অন্যান্য জরুরি সেবা" items={data.others} />
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center text-sm text-[var(--color-text-soft)]">
          এই পেজটি ধীরে ধীরে আপডেট করা হবে এবং স্থানীয় জরুরি সেবাগুলো যুক্ত করা হবে।
        </div>
      </div>
    </section>
  );
}
