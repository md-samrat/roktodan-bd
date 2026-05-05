export default function DonorsPage() {
  const donors = [
    {
      name: "রাকিব হোসেন",
      bloodGroup: "A+",
      location: "হোমনা, কুমিল্লা",
      phone: "01XXXXXXXXX",
      lastDonation: "৩ মাস আগে",
    },
    {
      name: "মোঃ সোহেল",
      bloodGroup: "O+",
      location: "ঘাগুটিয়া, হোমনা",
      phone: "01XXXXXXXXX",
      lastDonation: "১ মাস আগে",
    },
    {
      name: "নুসরাত জাহান",
      bloodGroup: "B+",
      location: "আছাদপুর, হোমনা",
      phone: "01XXXXXXXXX",
      lastDonation: "২ মাস আগে",
    },
    {
      name: "আল আমিন",
      bloodGroup: "AB+",
      location: "চান্দেরচর, হোমনা",
      phone: "01XXXXXXXXX",
      lastDonation: "৫ মাস আগে",
    },
  ];

  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-sm md:text-2xl font-semibold text-[var(--color-primary)] uppercase tracking-widest">
            রক্তদাতা তালিকা
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--color-text-main)]">
            হোমনা থানার রক্তদাতারা
          </h1>

          <p className="mt-4 text-[var(--color-text-soft)] max-w-2xl mx-auto leading-8">
            নিচে কিছু নিবন্ধিত রক্তদাতার তালিকা দেওয়া হলো। জরুরি প্রয়োজনে সরাসরি যোগাযোগ করতে পারেন।
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donors.map((donor, index) => (
            <div
              key={index}
              className="card hover:shadow-lg transition duration-300"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xl font-bold">
                  {donor.name.charAt(0)}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[var(--color-text-main)]">
                    {donor.name}
                  </h2>
                  <span className="badge mt-1 inline-block">
                    {donor.bloodGroup}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 space-y-2 text-[var(--color-text-soft)]">
                <p>📍 {donor.location}</p>
                <p>📞 {donor.phone}</p>
                <p>🕒 শেষ রক্তদান: {donor.lastDonation}</p>
              </div>

              {/* Button */}
              <button className="mt-5 w-full btn-primary">
                যোগাযোগ করুন
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
