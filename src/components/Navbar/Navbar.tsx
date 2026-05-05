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
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* 🔵 Logo */}
        <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-primary)] whitespace-nowrap">
          RoktoDan
        </h1>

        {/* 📚 Menu (desktop only) */}
        <div className="hidden md:flex items-center gap-8 text-[var(--color-text-main)] font-medium text-lg md:text-xl">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/donors">Donors</Link>
        </div>

        {/* 🔍 Search (desktop only, centered feel) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border rounded-lg overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search Blood A+, B-,AB+"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 outline-none text-sm w-40"
          />
          <button
            type="submit"
            className="bg-[var(--color-primary)] text-white px-3 py-2 text-md"
          >
            Search
          </button>
        </form>

        {/* 🔐 Actions (desktop only) */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <button className="px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="btn-primary">
              Register
            </button>
          </Link>
        </div>

        {/* 📱 Mobile Search (only mobile) */}
        <form
          onSubmit={handleSearch}
          className="flex md:hidden items-center border rounded-lg overflow-hidden ml-3 w-full max-w-[160px]"
        >
          <input
            type="text"
            placeholder="Search Blood"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 py-2 outline-none text-sm w-full"
          />
          <button
            type="submit"
            className="bg-[var(--color-primary)] text-white px-2 py-2 text-sm"
          >
            Search
          </button>
        </form>

      </div>
    </nav>
  );
}