"use client";

import { useState } from "react";
import { FiCopy, FiCheck, FiHeart } from "react-icons/fi";

export default function DonationSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText("01861790495");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-16">
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

        {/* Single Donation Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📱</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              bKash / নগদ
            </h3>
            
            

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <code className="text-xl font-mono text-gray-800 font-bold">
                01745240014
              </code>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyNumber}
                className="flex-1 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <FiCheck /> নম্বর কপি হয়েছে
                  </>
                ) : (
                  <>
                    <FiCopy /> নম্বর কপি করুন
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Send Money করুন <span className="font-semibold">"রক্তদান"</span> লিখে
            </p>

            {/* Dual Logo */}
            <div className="flex justify-center gap-4 mt-4 pt-3 border-t">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-pink-600">bKash</span>
                <span className="text-gray-400">|</span>
                <span className="text-sm font-semibold text-orange-600">নগদ</span>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
}