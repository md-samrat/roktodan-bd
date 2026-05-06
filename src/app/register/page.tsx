"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    bloodGroup: "",
    address: "",
    lastDonationDate: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const bdPhoneRegex = /^01[3-9]\d{8}$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // phone number validation (frontend)
    if (name === "phoneNumber") {
      if (!value) {
        setPhoneError("");
      } else if (!bdPhoneRegex.test(value)) {
        setPhoneError("সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (01XXXXXXXXX)");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // submit এর আগেও validation check
    if (!bdPhoneRegex.test(formData.phoneNumber)) {
      setPhoneError("সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (01XXXXXXXXX)");
      return;
    }

    console.table(formData);

    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        bloodDonationDate: formData.lastDonationDate,
      }),
    });

    if (res.ok) {
      setShowModal(true);

      // ⏳ 2 second por redirect
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm md:text-2xl font-semibold text-[var(--color-primary)] uppercase tracking-widest">
            রেজিস্ট্রেশন
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--color-text-main)]">
            রক্তদাতা হিসেবে যোগ দিন
          </h1>

          <p className="mt-4 text-[var(--color-text-soft)] leading-8 max-w-2xl mx-auto">
            কুমিল্লার মানুষের জন্য তৈরি রক্তদান প্ল্যাটফর্মে আপনার তথ্য যুক্ত
            করুন এবং জরুরি মুহূর্তে অন্যের জীবন বাঁচাতে এগিয়ে আসুন।
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card space-y-6 p-8 md:p-10">
          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              পুরো নাম
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="আপনার নাম লিখুন"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              মোবাইল নাম্বার
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none"
              required
            />

            {phoneError && (
              <p className="mt-2 text-sm text-red-500">{phoneError}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              রক্তের গ্রুপ
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none"
              required
            >
              <option value="">রক্তের গ্রুপ নির্বাচন করুন</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              গ্রাম / এলাকা
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="আপনার এলাকা লিখুন"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              সর্বশেষ রক্তদানের তারিখ (যদি থাকে)
            </label>
            <input
              type="date"
              name="lastDonationDate"
              value={formData.lastDonationDate}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="একটি শক্তিশালী পাসওয়ার্ড দিন"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3 text-lg font-medium"
          >
            রেজিস্ট্রেশন সম্পন্ন করুন
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl w-[90%] max-w-md">
            <h2 className="text-2xl font-bold text-green-600 mb-3">
              সফল হয়েছে
            </h2>
            <p className="text-gray-600">
              আপনার রেজিস্ট্রেশন সম্পন্ন হয়েছে। আপনাকে হোম পেজে নেওয়া হচ্ছে...
            </p>
          </div>
        </div>
      )}
    </section>
  );
}