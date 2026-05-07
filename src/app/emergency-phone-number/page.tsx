"use client";

import DonationSection from "@/components/DonationSection/DonationSection";
import { useState } from "react";
import { 
  FaPhone, 
  FaHospital, 
  FaAmbulance, 
  FaFireExtinguisher,
  FaSearch,
  FaMapMarkerAlt,
  FaInfoCircle
} from "react-icons/fa";
import { MdLocalPolice, MdHealthAndSafety } from "react-icons/md";

export default function EmergencyPhonePage() {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔴 এখানে আপনাকে রিয়েল নম্বর দিতে হবে
  const data = {
    hospitals: [
      { name: "কুমিল্লা মেডিকেল কলেজ হাসপাতাল", phone: "০৮১-৬১৯৫২", area: "কুমিল্লা সিটি", type: "সরকারি", verified: true },
      { name: "কুমিল্লা জেনারেল হাসপাতাল", phone: "০৮১-২৩৪৫৬", area: "কুমিল্লা সিটি", type: "সরকারি", verified: false },
      { name: "চান্দিনা উপজেলা স্বাস্থ্য কমপ্লেক্স", phone: "০৮১-২৩৫৬১", area: "চান্দিনা", type: "উপজেলা", verified: true },
      { name: "হোমনা উপজেলা স্বাস্থ্য কমপ্লেক্স", phone: "০৮১-২৮৫৬২", area: "হোমনা", type: "উপজেলা", verified: false },
      { name: "দাউদকান্দি উপজেলা স্বাস্থ্য কমপ্লেক্স", phone: "সংগ্রহ করা হয়নি", area: "দাউদকান্দি", type: "উপজেলা", verified: false },
      { name: "লাকসাম উপজেলা স্বাস্থ্য কমপ্লেক্স", phone: "সংগ্রহ করা হয়নি", area: "লাকসাম", type: "উপজেলা", verified: false },
    ],
    ambulances: [
      { name: "কুমিল্লা সিটি অ্যাম্বুলেন্স সার্ভিস", phone: "সংগ্রহ করা হয়নি", area: "কুমিল্লা সিটি", type: "২৪/৭", verified: false },
      { name: "রক্তদান ফাউন্ডেশন অ্যাম্বুলেন্স", phone: "সংগ্রহ করা হয়নি", area: "সারাদেশ", type: "ফ্রি সেবা", verified: false },
      { name: "হোমনা অ্যাম্বুলেন্স সার্ভিস", phone: "সংগ্রহ করা হয়নি", area: "হোমনা", type: "২৪/৭", verified: false },
    ],
    police: [
      { name: "কুমিল্লা জেলা পুলিশ কন্ট্রোল রুম", phone: "০৮১-৬২২০০", area: "কুমিল্লা", type: "কন্ট্রোল রুম", verified: true },
      { name: "হোমনা থানা পুলিশ", phone: "০৮১-২৮৫৩১", area: "হোমনা", type: "থানা", verified: true },
      { name: "জাতীয় জরুরি সেবা", phone: "999", area: "সারাদেশ", type: "হটলাইন", verified: true },
    ],
    others: [
      { name: "ফায়ার সার্ভিস ও সিভিল ডিফেন্স", phone: "১৬১৬৩", area: "সারাদেশ", type: "জরুরি", verified: true },
      { name: "জাতীয় জরুরি নম্বর", phone: "৯৯৯", area: "সারাদেশ", type: "জরুরি", verified: true },
      { name: "দুর্যোগ ব্যবস্থাপনা সেবা", phone: "১০৯০", area: "সারাদেশ", type: "হটলাইন", verified: true },
    ],
  };

  const Card = ({ title, items, icon }: { title: string; items: any[]; icon: React.ReactNode }) => (
    <div className="card hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl text-[var(--color-primary)]">{icon}</div>
          <h2 className="text-xl font-bold text-[var(--color-text-main)]">{title}</h2>
        </div>
        <span className="text-xs px-2 py-1 bg-gray-100 rounded">সরকারি তথ্য</span>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">কোনো ডাটা পাওয়া যায়নি</p>
        ) : (
          items.map((item: any, idx: number) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 gap-2">
              <div>
                <p className="text-[var(--color-text-main)] font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.area} • {item.type}</p>
              </div>

              {item.phone === "সংগ্রহ করা হয়নি" ? (
                <span className="text-yellow-600 text-sm flex items-center gap-1">
                  <FaInfoCircle />
                  শীঘ্রই যুক্ত হবে
                </span>
              ) : (
                <a
                  href={`tel:${item.phone}`}
                  className="text-[var(--color-primary)] font-semibold hover:underline flex items-center gap-1"
                >
                  <FaPhone className="text-sm" />
                  {item.phone}
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const areas = ["সব এলাকা", "কুমিল্লা সিটি", "হোমনা", "চান্দিনা", "লাকসাম", "দাউদকান্দি"];
  const [selectedArea, setSelectedArea] = useState("সব এলাকা");

  const filteredData = {
    hospitals: data.hospitals.filter(item => 
      (selectedArea === "সব এলাকা" || item.area === selectedArea) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    ambulances: data.ambulances.filter(item => 
      (selectedArea === "সব এলাকা" || item.area === selectedArea) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    police: data.police.filter(item => 
      (selectedArea === "সব এলাকা" || item.area === selectedArea) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    others: data.others.filter(item => 
      (selectedArea === "সব এলাকা" || item.area === selectedArea) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  };

  return (
    <section className="w-full py-20 ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm md:text-2xl font-semibold text-[var(--color-primary)] uppercase tracking-widest">
            জরুরি সেবা
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--color-text-main)]">
            কুমিল্লা জেলার জরুরি ফোন নম্বর
          </h1>

          <p className="mt-4 text-[var(--color-text-soft)] max-w-2xl mx-auto leading-8">
            এখানে কুমিল্লা জেলার সরকারি হাসপাতাল, থানা ও অন্যান্য জরুরি সেবার 
            সঠিক ফোন নম্বর সংযোজন করা হচ্ছে। ভুল তথ্য পেলে আমাদের জানাবেন।
          </p>
        </div>

        {/* Important Notice */}
        <div className="card mb-8 border-l-4 border-red-500 bg-red-50">
          <p className="text-[var(--color-text-main)] font-medium flex items-center gap-2">
            <MdHealthAndSafety className="text-red-500 text-xl" />
            🚨 জরুরি প্রয়োজনে সর্বদা জাতীয় জরুরি সেবা 
            <strong className="text-red-600 text-lg"> ৯৯৯ </strong> 
            নম্বরে কল করুন
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="হাসপাতাল বা এলাকা খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="md:w-64 relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
            >
              {areas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <FaHospital className="text-2xl text-[var(--color-primary)] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--color-primary)]">{data.hospitals.length}</div>
            <div className="text-sm text-gray-500">হাসপাতাল</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <FaAmbulance className="text-2xl text-[var(--color-primary)] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--color-primary)]">{data.ambulances.length}</div>
            <div className="text-sm text-gray-500">অ্যাম্বুলেন্স</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <MdLocalPolice className="text-2xl text-[var(--color-primary)] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--color-primary)]">{data.police.length}</div>
            <div className="text-sm text-gray-500">পুলিশ সেবা</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <FaFireExtinguisher className="text-2xl text-[var(--color-primary)] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--color-primary)]">{data.others.length}</div>
            <div className="text-sm text-gray-500">জরুরি সেবা</div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card title="হাসপাতাল ও ক্লিনিক" items={filteredData.hospitals} icon={<FaHospital />} />
          <Card title="অ্যাম্বুলেন্স সার্ভিস" items={filteredData.ambulances} icon={<FaAmbulance />} />
          <Card title="পুলিশ সেবা" items={filteredData.police} icon={<MdLocalPolice />} />
          <Card title="অন্যান্য জরুরি সেবা" items={filteredData.others} icon={<FaFireExtinguisher />} />
        </div>

        {/* Contribution Note */}
        <div className="mt-10 p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            📞 আপনার এলাকার সঠিক জরুরি নম্বর জানা থাকলে আমাদের জানান। 
            আমরা তা যাচাই করে এখানে যুক্ত করব।
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[var(--color-text-soft)]">
          <p>⚠️ নোট: সকল তথ্য সরকারি সূত্র থেকে সংগ্রহ করা হচ্ছে। "সংগ্রহ করা হয়নি" লেখা নম্বরগুলো শীঘ্রই আপডেট করা হবে।</p>
       
        </div>
        <DonationSection></DonationSection>
      </div>
    </section>
  );
}