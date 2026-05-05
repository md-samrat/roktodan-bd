"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [search, setSearch] = useState("");
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

        {/* 🔴 Logo */}
        <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-primary)] whitespace-nowrap">
          রক্তদান
        </h1>

        {/* 📚 Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-[var(--color-text-main)] font-medium text-lg">
          <Link
            href="/"
            className="hover:text-[var(--color-primary)] transition font-semibold"
          >
            হোম
          </Link>

          <Link
            href="/about"
            className="hover:text-[var(--color-primary)] transition font-semibold"
          >
            আমাদের সম্পর্কে
          </Link>

          <Link
            href="/donors"
            className="hover:text-[var(--color-primary)] transition font-semibold"
          >
            রক্তদাতা
          </Link>
        </div>

        {/* 🔍 Search (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border border-gray-200 rounded-lg overflow-hidden"
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
            className="bg-[var(--color-primary)] text-white px-4 py-2 text-sm font-medium"
          >
            খুঁজুন
          </button>
        </form>

        {/* 🔐 Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <button className="px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition">
              লগইন
            </button>
          </Link>

          <Link href="/register">
            <button className="btn-primary">
              রেজিস্ট্রেশন
            </button>
          </Link>
        </div>

        {/* 📱 Mobile Search */}
        <form
          onSubmit={handleSearch}
          className="flex md:hidden items-center border border-gray-200 rounded-lg overflow-hidden ml-3 w-full max-w-[180px]"
        >
          <input
            type="text"
            placeholder="রক্ত খুঁজুন"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 outline-none text-sm w-full"
          />

          <button
            type="submit"
            className="bg-[var(--color-primary)] text-white px-3 py-2 text-sm"
          >
            খুঁজুন
          </button>
        </form>

      </div>
    </nav>
  );
}