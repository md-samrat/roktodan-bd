"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      // ✅ সঠিক API endpoint (এটা চেক করুন)
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response status:", res.status);
      console.log("Response data:", data);

      if (!res.ok) {
        if (res.status === 404) {
          setErrorMessage("এই মোবাইল নাম্বারটি আমাদের সিস্টেমে পাওয়া যায়নি। আগে রেজিস্ট্রেশন করুন।");
        } else if (res.status === 401) {
          setErrorMessage("পাসওয়ার্ড ভুল। অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।");
        } else {
          setErrorMessage(data.message || "লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        }
        setErrorModal(true);
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        // Navbar আপডেটের জন্য ইভেন্ট ডিসপ্যাচ
        window.dispatchEvent(new Event("authChange"));
        router.push("/profile");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage("নেটওয়ার্ক সমস্যা হয়েছে। আবার চেষ্টা করুন।");
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

      {/* Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center w-[90%] max-w-md shadow-xl">

            <div className="text-5xl mb-4">
              {errorMessage.includes("পাসওয়ার্ড") ? "🔐" : "⚠️"}
            </div>

            <h2 className="text-2xl font-bold text-red-600">
              {errorMessage.includes("পাসওয়ার্ড") ? "পাসওয়ার্ড ভুল!" : "ইউজার পাওয়া যায়নি!"}
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              {errorMessage}
            </p>

            <div className="mt-6 flex gap-3 justify-center">
              <button
                onClick={() => setErrorModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                বন্ধ করুন
              </button>

              {errorMessage.includes("পাওয়া যায়নি") && (
                <Link href="/register">
                  <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-700 transition">
                    রেজিস্ট্রেশন করুন
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}