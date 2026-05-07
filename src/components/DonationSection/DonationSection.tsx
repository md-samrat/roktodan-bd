"use client";

import { useState } from "react";
import { FiCopy, FiCheck, FiHeart } from "react-icons/fi";

export default function DonationSection() {
  const [copiedBkash, setCopiedBkash] = useState(false);
  const [copiedNagad, setCopiedNagad] = useState(false);

  const handleCopyNumber = (number: string, type: string) => {
    navigator.clipboard.writeText(number);
    if (type === "bkash") {
      setCopiedBkash(true);
      setTimeout(() => setCopiedBkash(false), 2000);
    } else {
      setCopiedNagad(true);
      setTimeout(() => setCopiedNagad(false), 2000);
    }
  };

  return (
    <section className="w-full py-16 ">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
            <FiHeart className="animate-pulse" />
            <span className="text-md md:text-xl font-semibold">আমাদের সহযোগিতা করুন</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            আপনার সাহায্যে বাঁচে আরও জীবন
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            আমরা একটি অলাভজনক সংস্থা। আপনার অর্থ সাহায্য আমাদের এই সেবামূলক
            কার্যক্রম চালিয়ে যেতে সাহায্য করবে।
          </p>
        </div>

        {/* Donation Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* bKash Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📱</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">bKash</h3>
            

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <code className="text-lg font-mono text-gray-800">
                01861790495
              </code>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleCopyNumber("01861790495", "bkash")}
                className="flex-1 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                {copiedBkash ? (
                  <>
                    <FiCheck /> কপি হয়েছে
                  </>
                ) : (
                  <>
                    <FiCopy /> নম্বর কপি করুন
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Send Money করুন "রক্তদান" লিখে
            </p>
          </div>

          {/* Nagad Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📱</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">নগদ</h3>
            

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <code className="text-lg font-mono text-gray-800">
                01745240014
              </code>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleCopyNumber("01745240014", "nagad")}
                className="flex-1 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                {copiedNagad ? (
                  <>
                    <FiCheck /> কপি হয়েছে
                  </>
                ) : (
                  <>
                    <FiCopy /> নম্বর কপি করুন
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Send Money করুন "রক্তদান" লিখে
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
