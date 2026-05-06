"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="w-full py-20 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-4 w-full">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm md:text-2xl font-semibold text-[var(--color-primary)] uppercase tracking-widest">
            লগইন
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--color-text-main)]">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </h1>

          <p className="mt-4 text-[var(--color-text-soft)] leading-8 max-w-xl mx-auto">
            রক্তদান প্ল্যাটফর্মে লগইন করে রক্তদাতা খুঁজুন অথবা নিজের প্রোফাইল পরিচালনা করুন।
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="card p-8 md:p-10 space-y-6"
        >
          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              মোবাইল নাম্বার
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full btn-primary py-3 text-lg font-medium"
          >
            লগইন করুন
          </button>

          {/* Register Link */}
          <p className="text-center text-[var(--color-text-soft)]">
            এখনও অ্যাকাউন্ট নেই? {" "}
            <Link
              href="/register"
              className="text-[var(--color-primary)] font-medium hover:underline"
            >
              রেজিস্ট্রেশন করুন
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
