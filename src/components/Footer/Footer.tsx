import Link from "next/link";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-primary)] text-white mt-16">
      {/* 🔺 top zigzag (optional decorative feel) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-6"
        >
          <polygon
            fill="#ffffff"
            points="0,0 50,120 100,0 150,120 200,0 250,120 300,0 350,120 400,0 450,120 500,0 550,120 600,0 650,120 700,0 750,120 800,0 850,120 900,0 950,120 1000,0 1050,120 1100,0 1150,120 1200,0 1200,0 0,0"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-14 pb-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* 🩸 Left */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">রক্তদান </h2>

          <p className="mt-3 text-sm md:text-lg text-white/90 leading-relaxed">
            রক্তদান is an automated blood service that connects blood donors
            with patients instantly through web platform.
          </p>
        </div>

        {/* 📚 Middle */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Important Links
          </h3>
          <ul className="space-y-2 text-sm md:text-lg text-white/90">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/donors">Search Donors</Link>
            </li>
          </ul>
        </div>

        {/* 📘 Right */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm md:text-lg text-white/90">
            <li>
              <a href="mailto:md.samrat.dev@gmail.com">
                Email : md.samrat.dev@gmail.com
              </a>
            </li>
            <li className="flex gap-4 mt-3">
              <a
                href="https://www.facebook.com/mohammad.samrat0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:scale-110 transition"
              >
                <FaFacebookF size={30}/>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/8801861790495"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:scale-110 transition"
              >
                <FaWhatsapp size={30}/>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔻 Bottom bar */}
      <div className="bg-black/40 text-center py-4 text-sm md:text-lg text-white/80 px-6">
        <span>
          Copyright © {new Date().getFullYear()} RoktoDan Made with by{" "}
          <Link href={"https://www.facebook.com/mohammad.samrat0/"} className="text-yellow-400 font-bold">
            Mohammad Samrat
          </Link>{" "}
        </span>
      </div>
    </footer>
  );
}
