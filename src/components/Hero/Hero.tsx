import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* 🧠 Left Content */}
          <div>
            <span className="text-sm px-3 py-1 rounded-full bg-[var(--color-secondary)] text-white">
              Homna • Cumilla Blood Network
            </span>

            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[var(--color-text-main)] leading-tight">
              Your Blood Can <br />
              <span className="text-[var(--color-primary)]">Save Someone’s Life</span>
            </h1>

            <p className="mt-4 text-[var(--color-text-soft)] text-lg">
              Find blood donors instantly or register yourself to help people in emergency situations.
            </p>

            {/* 🎯 Buttons */}
            <div className="mt-6 flex gap-4">
              <Link href="/register">
                <button className="btn-primary">
                  Become a Donor
                </button>
              </Link>

              <Link href="/donors">
                <button className="px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition">
                  Search Donors
                </button>
              </Link>
            </div>

            {/* ⚡ small stats */}
            <div className="mt-8 flex gap-6 text-sm text-[var(--color-text-soft)]">
              <div>
                <p className="text-xl font-bold text-[var(--color-text-main)]">100+</p>
                <p>Registered Donors</p>
              </div>

              <div>
                <p className="text-xl font-bold text-[var(--color-text-main)]">24/7</p>
                <p>Emergency Support</p>
              </div>

             
            </div>
          </div>

          {/* 🖼️ Right Visual Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-[var(--color-bg)] rounded-2xl shadow-lg p-8 text-center">

              <div className="text-6xl">🩸</div>

              <h2 className="mt-4 text-xl font-bold text-[var(--color-text-main)]">
                Emergency Blood Needed?
              </h2>

              <p className="mt-2 text-[var(--color-text-soft)]">
                Search donors by blood group instantly in Homna area.
              </p>

              <Link href="/donors">
                <button className="mt-6 w-full btn-primary">
                  Find Now
                </button>
              </Link>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}