"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/donors?group=${search}`);
    setSearch("");
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* 📱 MOBILE: hamburger -> logo -> search -> login */}
        <div className="flex md:hidden items-center gap-3 w-full">
          {/* Hamburger */}
          <button
            className="text-3xl text-[var(--color-primary)]"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>

          {/* Logo */}
          <Link href={'/'} className="text-2xl font-bold text-[var(--color-primary)] whitespace-nowrap">
            রক্তদান
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-200 rounded-lg overflow-hidden ml-auto"
          >
            <input
              type="text"
              placeholder="A+, B-"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-2 py-2 outline-none text-sm w-20"
            />

            <button
              type="submit"
              className="bg-[var(--color-primary)] text-white px-2 py-2 text-sm"
            >
              🔍
            </button>
          </form>

          {/* Login */}
          <Link href="/login">
            <button className="px-4 py-1 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition whitespace-nowrap">
              লগইন
            </button>
          </Link>
        </div>

        {/* 💻 DESKTOP: logo -> navlinks -> search -> register -> login */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Logo */}
          <Link href={'/'} className="text-3xl font-bold text-[var(--color-primary)] whitespace-nowrap">
            রক্তদান
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8 text-[var(--color-text-main)] font-medium text-lg">
            <Link href="/" className="hover:text-[var(--color-primary)]">
              হোম
            </Link>

            <Link href="/about" className="hover:text-[var(--color-primary)]">
              আমাদের সম্পর্কে
            </Link>

            <Link href="/donors" className="hover:text-[var(--color-primary)]">
              রক্তদাতা
            </Link>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-200 rounded-lg overflow-hidden"
          >
            <input
              type="text"
              placeholder="A+, B-, O+ লিখুন"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 outline-none text-sm w-44"
            />

            <button
              type="submit"
              className="bg-[var(--color-primary)] text-white px-4 py-2 text-sm"
            >
              খুঁজুন
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Register */}
            <Link href="/register">
              <button className="btn-primary whitespace-nowrap">
                রেজিস্ট্রেশন
              </button>
            </Link>

            {/* Login */}
            <Link href="/login">
              <button className="px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition whitespace-nowrap">
                লগইন
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">
            মেনু
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-2xl"
          >
            ✖
          </button>
        </div>

        <div className="p-4 space-y-4 text-lg font-medium">
          <Link href="/" onClick={() => setOpen(false)} className="block">
            হোম
          </Link>

          <Link href="/about" onClick={() => setOpen(false)} className="block">
            আমাদের সম্পর্কে
          </Link>

          <Link href="/donors" onClick={() => setOpen(false)} className="block">
            রক্তদাতা
          </Link>

          <Link href="/register" onClick={() => setOpen(false)} className="block text-[var(--color-primary)]">
            রেজিস্ট্রেশন
          </Link>
        </div>
      </div>
    </nav>
  );
}
