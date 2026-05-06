"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorModal(false);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // ❗ show modal instead of simple error
        setErrorModal(true);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (err) {
      setErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-20 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-4 w-full">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">
            লগইন করুন
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-8 space-y-6">

          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="মোবাইল নাম্বার"
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="পাসওয়ার্ড"
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3"
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
          </button>

          <p className="text-center text-sm">
            একাউন্ট নেই?{" "}
            <Link href="/register" className="text-blue-600">
              রেজিস্ট্রেশন করুন
            </Link>
          </p>
        </form>
      </div>

      {/* 🚨 Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center w-[90%] max-w-md shadow-xl">

            <div className="text-5xl mb-4">⚠️</div>

            <h2 className="text-2xl font-bold text-red-600">
              আপনি রেজিস্ট্রেশন করেননি
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              এই মোবাইল নাম্বারটি আমাদের সিস্টেমে পাওয়া যায়নি।  
              আগে রেজিস্ট্রেশন করুন তারপর লগইন করুন।
            </p>

            <div className="mt-6 flex gap-3 justify-center">
              <button
                onClick={() => setErrorModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                বন্ধ করুন
              </button>

              <Link href="/register">
                <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg">
                  রেজিস্ট্রেশন করুন
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}