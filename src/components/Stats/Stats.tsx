export default function Stats() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)]">
          We’re a growing blood donation network
        </h2>

        {/* Stats Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Donors */}
          <div className="flex flex-col items-center">
            <div className="text-6xl">🧑‍🤝‍🧑</div>

            <p className="mt-5 text-4xl font-extrabold text-[var(--color-primary)]">
              1300+
            </p>

            <p className="mt-2 text-lg text-[var(--color-text-soft)]">
              Registered Donors
            </p>
          </div>

          {/* Village */}
          <div className="flex flex-col items-center">
            <div className="text-6xl">📍</div>

            <p className="mt-5 text-4xl font-extrabold text-[var(--color-primary)]">
              50+
            </p>

            <p className="mt-2 text-lg text-[var(--color-text-soft)]">
              Villages Covered
            </p>
          </div>

          {/* Blood Groups */}
          <div className="flex flex-col items-center">
            <div className="text-6xl">🩸</div>

            <p className="mt-5 text-4xl font-extrabold text-[var(--color-primary)]">
              8
            </p>

            <p className="mt-2 text-lg text-[var(--color-text-soft)]">
              Blood Groups Available
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}