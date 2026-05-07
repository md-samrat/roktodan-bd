"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Donor {
  _id: string;
  name: string;
  phoneNumber: string;
  bloodGroup: string;
  address: string;
  gender: string;
  profileImage: string;
}

function DonorsContent() {
  const searchParams = useSearchParams();
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchGroup, setSearchGroup] = useState("");

  // URL থেকে group প্যারামিটার নেওয়া (ডিকোড সহ)
  useEffect(() => {
    const group = searchParams.get("group");
    console.log("🔍 URL থেকে পাওয়া গ্রুপ (এনকোডেড):", group);
    
    if (group) {
      // URL ডিকোড করুন (AB+ এর জন্য + চিহ্ন ঠিক রাখবে)
      const decodedGroup = decodeURIComponent(group);
      console.log("🔍 ডিকোড করা গ্রুপ:", decodedGroup);
      setSearchGroup(decodedGroup);
    }
  }, [searchParams]);

  // ডাটা লোড করা
  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users");
      const data = await response.json();

      console.log("📋 সব দাতা:", data);
      
      // ডাটাবেসে কি কি গ্রুপ আছে দেখুন
      const groups = [...new Set(data.map((d: any) => d.bloodGroup))];
      console.log("📋 ডাটাবেসের গ্রুপসমূহ:", groups);

      if (Array.isArray(data)) {
        setDonors(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ফিল্টার ফাংশন (এক্সাক্ট ম্যাচ)
  useEffect(() => {
    if (searchGroup) {
      // স্ট্রেইট এক্সাক্ট ম্যাচ (Case-insensitive)
      const filtered = donors.filter(
        (donor) => donor.bloodGroup?.toLowerCase() === searchGroup.toLowerCase()
      );
      
      console.log(`🔍 ফিল্টারিং: ${searchGroup} -> পাওয়া গেছে: ${filtered.length} জন`);
      console.log("ফিল্টার করা দাতা:", filtered);
      
      setFilteredDonors(filtered);
    } else {
      setFilteredDonors(donors);
    }
  }, [searchGroup, donors]);

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  if (loading) {
    return (
      <section className="w-full py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">লোড হচ্ছে...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm md:text-2xl font-semibold text-[var(--color-primary)] uppercase tracking-widest">
            রক্তদাতা তালিকা
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--color-text-main)]">
            কুমিল্লার বিভিন্ন জায়গার রক্তদাতারা
          </h1>
          <p className="mt-4 text-[var(--color-text-soft)] max-w-2xl mx-auto leading-8">
            নিচে কিছু নিবন্ধিত রক্তদাতার তালিকা দেওয়া হলো। জরুরি প্রয়োজনে সরাসরি যোগাযোগ করতে পারেন।
          </p>
        </div>

        {/* সার্চ ইন্ডিকেটর */}
        {searchGroup && (
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
              🩸 {searchGroup} গ্রুপের দাতা দেখাচ্ছে
              <button
                onClick={() => {
                  setSearchGroup("");
                  window.history.pushState({}, "", "/donors");
                }}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-gray-500">
            মোট {filteredDonors.length} জন রক্তদাতা পাওয়া গেছে
          </p>
        </div>

        {filteredDonors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {searchGroup ? `${searchGroup} গ্রুপের কোন রক্তদাতা পাওয়া যায়নি` : "কোন রক্তদাতা পাওয়া যায়নি"}
            </p>
            <Link
              href="/register"
              className="inline-block mt-4 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg"
            >
              রক্তদাতা হিসেবে রেজিস্ট্রেশন করুন
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDonors.map((donor) => (
              <div key={donor._id} className="card hover:shadow-lg transition duration-300">
                <div className="flex items-center gap-4">
                  {donor.profileImage ? (
                    <img
                      src={donor.profileImage}
                      alt={donor.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[var(--color-primary)]"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xl font-bold">
                      {donor.name?.charAt(0) || "?"}
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-bold text-[var(--color-text-main)]">
                      {donor.name}
                    </h2>
                    <span className="badge mt-1 inline-block">
                      {donor.bloodGroup}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-[var(--color-text-soft)]">
                  <p>📍 {donor.address || "ঠিকানা নেই"}</p>
                  <p>📞 {donor.phoneNumber}</p>
                  <p>🩸 ব্লাড গ্রুপ: {donor.bloodGroup}</p>
                  <p>👤 {donor.gender === "Male" ? "পুরুষ" : donor.gender === "Female" ? "মহিলা" : "অন্যান্য"}</p>
                </div>

                <button
                  onClick={() => handlePhoneClick(donor.phoneNumber)}
                  className="mt-5 w-full btn-primary"
                >
                  📞 যোগাযোগ করুন
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function DonorsPage() {
  return (
    <Suspense fallback={
      <section className="w-full py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">লোড হচ্ছে...</p>
        </div>
      </section>
    }>
      <DonorsContent />
    </Suspense>
  );
}