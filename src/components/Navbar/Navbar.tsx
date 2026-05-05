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

    // redirect to donors page with query
    router.push(`/donors?group=${search}`);
    setSearch("");
  };

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* 🔴 Logo */}
        <h1 className="text-xl font-bold text-[var(--color-primary)]">
          RoktoDan
        </h1>

        {/* 📚 Menu */}
        <div className="hidden md:flex items-center gap-6 text-[var(--color-text-main)] font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/donors">See Donors</Link>
        </div>

        {/* 🔍 Search + Actions */}
        <div className="flex items-center gap-3">

          {/* 🔍 Search Box */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search blood (A+, B-)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-[var(--color-primary)] text-white px-3 py-2"
            >
              Search
            </button>
          </form>

          {/* Login */}
          <Link href="/login">
            <button className="px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition">
              Login
            </button>
          </Link>

          {/* Register */}
          <Link href="/register">
            <button className="btn-primary">
              Register
            </button>
          </Link>

        </div>
      </div>
    </nav>
  );
}