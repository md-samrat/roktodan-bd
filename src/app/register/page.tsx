"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    bloodGroup: "",
    address: "",
    gender: "",
    lastDonationDate: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showAlreadyLoggedInModal, setShowAlreadyLoggedInModal] =
    useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // চেক করা ইউজার আগে থেকে লগইন আছে কিনা
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        setUserName(payload.name || "ইউজার");
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  const bdPhoneRegex = /^01[3-9]\d{8}$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Phone validation
    if (name === "phoneNumber") {
      if (!value) {
        setPhoneError("");
      } else if (!bdPhoneRegex.test(value)) {
        setPhoneError("সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (01XXXXXXXXX)");
      } else {
        setPhoneError("");
      }
    }

    // Password validation
    if (name === "password") {
      if (!value) {
        setPasswordError("");
      } else if (value.length < 6) {
        setPasswordError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      } else {
        setPasswordError("");
      }
    }
  };

  // আগে থেকে লগইন থাকলে প্রোফাইলে রিডাইরেক্ট
  const handleGoToProfile = () => {
    setShowAlreadyLoggedInModal(false);
    router.push("/profile");
  };

  // লগআউট করে নতুন রেজিস্ট্রেশন
  const handleLogoutAndRegister = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowAlreadyLoggedInModal(false);
    window.dispatchEvent(new Event("authChange"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // আগে থেকে লগইন থাকলে মডাল দেখান
    if (isLoggedIn) {
      setShowAlreadyLoggedInModal(true);
      return;
    }

    // Phone validation
    if (!bdPhoneRegex.test(formData.phoneNumber)) {
      setPhoneError("সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (01XXXXXXXXX)");
      return;
    }

    // Password validation
    if (!formData.password) {
      setPasswordError("পাসওয়ার্ড আবশ্যক");
      return;
    }
    if (formData.password.length < 6) {
      setPasswordError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        lastDonationDate: formData.lastDonationDate || undefined,
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!res.ok) {
        // ডুপ্লিকেট ফোন নাম্বার এরর
        if (res.status === 400 && 
            (data.message === "এই নাম্বার দিয়ে আগে থেকেই রেজিস্টার করা হয়েছে" ||
             data.message?.includes("phoneNumber"))) {
          setShowDuplicateModal(true);
        }
        // পাসওয়ার্ড ভ্যালিডেশন এরর
        else if (data.message?.includes("পাসওয়ার্ড") || 
                 data.message?.includes("password") ||
                 data.message?.includes("৬ অক্ষর")) {
          setErrorMessage("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
          setShowErrorModal(true);
        }
        // অন্যান্য এরর
        else {
          setErrorMessage(data.message || data.error || "রেজিস্ট্রেশন failed");
          setShowErrorModal(true);
        }
        return;
      }

      // Success - show modal
      setShowModal(true);

      // Save token if exists
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("authChange"));
      }

      // Save user data if exists
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Redirect to profile after 2 seconds
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error) {
      console.error("Network or parsing error:", error);
      setErrorMessage("নেটওয়ার্ক সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
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
            বাংলাদেশের মানুষের জন্য তৈরি রক্তদান প্ল্যাটফর্মে আপনার তথ্য যুক্ত
            করুন এবং জরুরি মুহূর্তে অন্যের জীবন বাঁচাতে এগিয়ে আসুন।
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card space-y-6 p-8 md:p-10">
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
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[var(--color-primary)] transition-colors"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              মোবাইল নাম্বার
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[var(--color-primary)] transition-colors"
              required
            />
            {phoneError && (
              <p className="mt-2 text-sm text-red-500">{phoneError}</p>
            )}
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
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[var(--color-primary)] transition-colors"
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

          {/* Gender */}
          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              লিঙ্গ
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[var(--color-primary)] transition-colors"
              required
            >
              <option value="">লিঙ্গ নির্বাচন করুন</option>
              <option value="Male">পুরুষ</option>
              <option value="Female">মহিলা</option>
              <option value="Other">অন্যান্য</option>
            </select>
          </div>

          {/* Address */}
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
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[var(--color-primary)] transition-colors"
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
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-[var(--color-text-main)]">
              পাসওয়ার্ড <span className="text-red-500 text-sm">(কমপক্ষে ৬ অক্ষর)</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="একটি শক্তিশালী পাসওয়ার্ড দিন"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[var(--color-primary)] transition-colors"
              required
            />
            {passwordError && (
              <p className="mt-2 text-sm text-red-500">{passwordError}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg text-lg font-medium hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "রেজিস্ট্রেশন হচ্ছে..." : "রেজিস্ট্রেশন সম্পন্ন করুন"}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl w-[90%] max-w-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-3">স্বাগতম!</h2>
            <p className="text-gray-600 mb-4">আপনার রেজিস্ট্রেশন সম্পন্ন হয়েছে। প্রোফাইলে নিয়ে যাওয়া হচ্ছে...</p>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}

      {/* Already Logged In Modal */}
      {showAlreadyLoggedInModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl w-[90%] max-w-md">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-yellow-600 mb-3">আপনি ইতিমধ্যে লগইন করেছেন!</h2>
            <p className="text-gray-600 mb-6">আপনি ইতিমধ্যে একটি অ্যাকাউন্ট দিয়ে লগইন করে আছেন। নতুন অ্যাকাউন্ট তৈরি করতে চাইলে প্রথমে লগআউট করুন।</p>
            <div className="flex flex-col gap-3">
              <button onClick={handleGoToProfile} className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-medium">প্রোফাইলে যান</button>
              <button onClick={handleLogoutAndRegister} className="w-full border border-red-500 text-red-500 py-3 rounded-lg font-medium">লগআউট করে নতুন রেজিস্ট্রেশন</button>
              <button onClick={() => setShowAlreadyLoggedInModal(false)} className="w-full text-gray-500 py-2 rounded-lg font-medium">বন্ধ করুন</button>
            </div>
          </div>
        </div>
      )}

      {/* Duplicate Phone Modal */}
      {showDuplicateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl w-[90%] max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-3">ফোন নাম্বার ইতিমধ্যে রেজিস্টার করা আছে!</h2>
            <p className="text-gray-600 mb-6">এই নাম্বারটি আগে থেকেই রেজিস্টার করা আছে। আপনি কি ইতিমধ্যে রেজিস্ট্রেশন করে থাকেন?</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => { setShowDuplicateModal(false); router.push("/login"); }} className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-medium">লগইন পেজে যান</button>
              <button onClick={() => setShowDuplicateModal(false)} className="w-full text-gray-500 py-2 rounded-lg font-medium">বন্ধ করুন</button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl w-[90%] max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-3">সমস্যা হয়েছে!</h2>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <button onClick={() => setShowErrorModal(false)} className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-medium">আবার চেষ্টা করুন</button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
}