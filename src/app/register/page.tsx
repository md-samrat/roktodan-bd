"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    village: "",
    lastDonationDate: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
            হোমনা থানার মানুষের জন্য তৈরি রক্তদান প্ল্যাটফর্মে আপনার তথ্য যুক্ত করুন
            এবং জরুরি মুহূর্তে অন্যের জীবন বাঁচাতে এগিয়ে আসুন।
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="card space-y-6 p-8 md:p-10"
        >
          {/* Name */}
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

          {/* Blood Group */}
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

          {/* Village */}
          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              গ্রাম / এলাকা
            </label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              placeholder="আপনার গ্রাম লিখুন"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none"
              required
            />
          </div>

          {/* Last Donation */}
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
              placeholder="একটি শক্তিশালী পাসওয়ার্ড দিন"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full btn-primary py-3 text-lg font-medium"
          >
            রেজিস্ট্রেশন সম্পন্ন করুন
          </button>
        </form>
      </div>
    </section>
  );
}
