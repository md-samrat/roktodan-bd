"use client";

import React, { useState } from "react";

const faqData = [
  {
    question: "রক্তদান করতে হলে কী করতে হবে?",
    answer:
      "প্রথমে রোক্তদান ওয়েবসাইটে রেজিস্ট্রেশন করতে হবে। তারপর আপনার রক্তের গ্রুপ, ঠিকানা, মোবাইল নাম্বার এবং প্রয়োজনীয় তথ্য যুক্ত করতে হবে।",
  },
  {
    question: "রক্তদাতা খুঁজে পাবো কীভাবে?",
    answer:
      "আপনার প্রয়োজনীয় রক্তের গ্রুপ নির্বাচন করে সহজেই রক্তদাতাদের তালিকা দেখতে পারবেন এবং সরাসরি যোগাযোগ করতে পারবেন।",
  },
  {
    question: "রক্তদান কি নিরাপদ?",
    answer:
      "হ্যাঁ, সুস্থ মানুষের জন্য রক্তদান সম্পূর্ণ নিরাপদ। নির্দিষ্ট সময় পরপর রক্তদান করলে শরীরের কোনো ক্ষতি হয় না।",
  },
  {
    question: "কতদিন পরপর রক্ত দেওয়া যায়?",
    answer:
      "সাধারণত একজন সুস্থ মানুষ প্রতি ৩ থেকে ৪ মাস পরপর রক্ত দিতে পারেন।",
  },
  {
    question: "রেজিস্ট্রেশন কি সম্পূর্ণ ফ্রি?",
    answer:
      "হ্যাঁ, রোক্তদান ওয়েবসাইটে রেজিস্ট্রেশন সম্পূর্ণ বিনামূল্যে।",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm md:text-2xl font-semibold text-[var(--color-primary)] uppercase tracking-widest">
            FAQ
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-main mt-3">
            সচরাচর জিজ্ঞাসিত প্রশ্ন
          </h2>

          <p className="text-soft mt-4 max-w-2xl mx-auto">
            রোক্তদান সম্পর্কে সাধারণ কিছু প্রশ্ন ও উত্তর এখানে দেওয়া হলো।
            হোমনা থানার মানুষের জন্য দ্রুত রক্তদাতা খুঁজে পেতে এটি সহায়ক হবে।
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="card border border-gray-100 hover:shadow-md transition duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <h3 className="text-lg font-semibold text-main">
                  {item.question}
                </h3>

                <span className="text-2xl font-bold text-[var(--color-primary)]">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-soft leading-7">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;