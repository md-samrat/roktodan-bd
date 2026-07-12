"use client";

import { useState, useEffect } from "react";

interface Donor {
  id: string;
  name: string;
  phoneNumber: string;
  bloodGroup: string;
  address: string;
  gender: string;
  profileImage: string | null;
  lastDonationDate?: string | null;
}

interface StatsData {
  totalDonors: number;
  areas: number;
  bloodGroups: number;
  districts: number;
  divisions: number;
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData>({
    totalDonors: 0,
    areas: 0,
    bloodGroups: 0,
    districts: 0,
    divisions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/public-donors");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        //console.log("Stats API Response:", data); // ডিবাগিং
        
        // ✅ সঠিকভাবে ডেটা চেক করা
        if (data.success && Array.isArray(data.donors)) {
          const donors = data.donors;
          
          // ইউনিক ব্লাড গ্রুপ গণনা
          const uniqueBloodGroups = new Set(
            donors
              .map((donor: Donor) => donor.bloodGroup)
              .filter(Boolean)
          );
          
          // ইউনিক জেলা/এলাকা গণনা
          const uniqueAreas = new Set(
            donors
              .map((donor: Donor) => {
                const address = donor.address || "";
                // কমা বা ড্যাশ দিয়ে আলাদা করা
                const parts = address.split(/[,،،-]/);
                return parts[0]?.trim();
              })
              .filter(Boolean)
          );
          
          // ইউনিক জেলা গণনা (address এর দ্বিতীয় অংশ)
          const uniqueDistricts = new Set(
            donors
              .map((donor: Donor) => {
                const address = donor.address || "";
                const parts = address.split(/[,،،-]/);
                return parts[1]?.trim();
              })
              .filter(Boolean)
          );
          
          // ইউনিক বিভাগ গণনা (address এর তৃতীয় অংশ)
          const uniqueDivisions = new Set(
            donors
              .map((donor: Donor) => {
                const address = donor.address || "";
                const parts = address.split(/[,،،-]/);
                return parts[2]?.trim();
              })
              .filter(Boolean)
          );
          
          setStats({
            totalDonors: donors.length,
            areas: uniqueAreas.size || 0,
            bloodGroups: uniqueBloodGroups.size || 0,
            districts: uniqueDistricts.size || 0,
            divisions: uniqueDivisions.size || 0
          });
        } else {
          console.error("Invalid data format:", data);
          // ফallback ডেটা (যদি API থেকে ডেটা না আসে)
          setStats({
            totalDonors: 0,
            areas: 0,
            bloodGroups: 0,
            districts: 0,
            divisions: 0
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Error হলে fallback ডেটা দেখানো
        setStats({
          totalDonors: 0,
          areas: 0,
          bloodGroups: 0,
          districts: 0,
          divisions: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // ✅ রিফ্রেশের জন্য ইভেন্ট লিসেনার
    const handleRefresh = () => {
      fetchStats();
    };
    
    window.addEventListener("profileUpdated", handleRefresh);
    window.addEventListener("authChange", handleRefresh);
    
    return () => {
      window.removeEventListener("profileUpdated", handleRefresh);
      window.removeEventListener("authChange", handleRefresh);
    };
  }, []);

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        
        {/* Heading */}
        <p className="text-sm md:text-2xl font-semibold text-[var(--color-primary)] uppercase tracking-widest">
          পরিসংখ্যান
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] mt-3">
           বাংলাদেশের বৃহত্তম রক্তদান নেটওয়ার্ক
        </h2>

        <p className="mt-4 text-[var(--color-text-soft)] max-w-2xl mx-auto leading-7">
          বাংলাদেশের বিভিন্ন বিভাগ, জেলা ও এলাকার মানুষকে এক প্ল্যাটফর্মে যুক্ত করে
          জরুরি মুহূর্তে দ্রুত রক্তদাতা খুঁজে পাওয়ার সহজ সমাধান।
        </p>

        {/* Stats Grid - 5 columns for better display */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          
          {/* Total Donors */}
          <div className="card flex flex-col items-center hover:shadow-lg transition-shadow">
            <div className="text-5xl">🧑‍🤝‍🧑</div>
            <p className="mt-4 text-3xl md:text-4xl font-extrabold text-[var(--color-primary)]">
              {loading ? (
                <span className="inline-block w-16 h-10 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                `${stats.totalDonors.toLocaleString()}+`
              )}
            </p>
            <p className="mt-2 text-base font-medium text-[var(--color-text-main)]">
              নিবন্ধিত রক্তদাতা
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-soft)]">
              সারাদেশ থেকে
            </p>
          </div>

          {/* Divisions */}
          <div className="card flex flex-col items-center hover:shadow-lg transition-shadow">
            <div className="text-5xl">🗺️</div>
            <p className="mt-4 text-3xl md:text-4xl font-extrabold text-[var(--color-primary)]">
              {loading ? (
                <span className="inline-block w-16 h-10 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                stats.divisions || 0
              )}
            </p>
            <p className="mt-2 text-base font-medium text-[var(--color-text-main)]">
              বিভাগ
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-soft)]">
              বাংলাদেশের ৮ বিভাগ
            </p>
          </div>

          {/* Districts */}
          <div className="card flex flex-col items-center hover:shadow-lg transition-shadow">
            <div className="text-5xl">📍</div>
            <p className="mt-4 text-3xl md:text-4xl font-extrabold text-[var(--color-primary)]">
              {loading ? (
                <span className="inline-block w-16 h-10 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                stats.districts || 0
              )}
            </p>
            <p className="mt-2 text-base font-medium text-[var(--color-text-main)]">
              জেলা
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-soft)]">
              বাংলাদেশের বিভিন্ন জেলা
            </p>
          </div>

          {/* Areas */}
          <div className="card flex flex-col items-center hover:shadow-lg transition-shadow">
            <div className="text-5xl">🏘️</div>
            <p className="mt-4 text-3xl md:text-4xl font-extrabold text-[var(--color-primary)]">
              {loading ? (
                <span className="inline-block w-16 h-10 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                stats.areas || 0
              )}
            </p>
            <p className="mt-2 text-base font-medium text-[var(--color-text-main)]">
              এলাকা/উপজেলা
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-soft)]">
              সারাদেশের বিভিন্ন এলাকা
            </p>
          </div>

          {/* Blood Groups */}
          <div className="card flex flex-col items-center hover:shadow-lg transition-shadow">
            <div className="text-5xl">🩸</div>
            <p className="mt-4 text-3xl md:text-4xl font-extrabold text-[var(--color-primary)]">
              {loading ? (
                <span className="inline-block w-16 h-10 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                stats.bloodGroups || 0
              )}
            </p>
            <p className="mt-2 text-base font-medium text-[var(--color-text-main)]">
              রক্তের গ্রুপ
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-soft)]">
              A+, A-, B+, B-, AB+, AB-, O+, O-
            </p>
          </div>

        </div>

        {/* Live Update Notice */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span>লাইভ ডেটা • {loading ? 'লোড হচ্ছে...' : 'আপডেটেড'}</span>
        </div>
      </div>
    </section>
  );
}