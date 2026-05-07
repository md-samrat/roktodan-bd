"use client";

import { useState, useEffect } from "react";

export default function Stats() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    areas: 0,
    bloodGroups: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/public-donors");
        const data = await response.json();
        
        if (Array.isArray(data)) {
          // ইউনিক ব্লাড গ্রুপ গণনা
          const uniqueBloodGroups = new Set(data.map((user: any) => user.bloodGroup).filter(Boolean));
          
          // ইউনিক এলাকা গণনা
          const uniqueAreas = new Set(
            data.map((user: any) => {
              const address = user.address || "";
              const area = address.split(",")[0]?.trim();
              return area;
            }).filter(Boolean)
          );
          
          setStats({
            totalDonors: data.length,
            areas: uniqueAreas.size || 17,
            bloodGroups: uniqueBloodGroups.size || 8
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats({
          totalDonors: 150,
          areas: 17,
          bloodGroups: 8
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        
        {/* Heading */}
        <p className="text-sm md:text-2xl font-semibold text-[var(--color-primary)] uppercase tracking-widest">
          পরিসংখ্যান
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] mt-3">
          রক্তদান একটি দ্রুত বর্ধনশীল রক্তদান নেটওয়ার্ক
        </h2>

        <p className="mt-4 text-[var(--color-text-soft)] max-w-2xl mx-auto leading-7">
          কুমিল্লার বিভিন্ন উপজেলার মানুষকে এক প্ল্যাটফর্মে যুক্ত করে
          জরুরি মুহূর্তে দ্রুত রক্তদাতা খুঁজে পাওয়ার সহজ সমাধান।
        </p>

        {/* Stats Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Donors */}
          <div className="card flex flex-col items-center">
            <div className="text-6xl">🧑‍🤝‍🧑</div>

            <p className="mt-5 text-4xl font-extrabold text-[var(--color-primary)]">
              {loading ? (
                <span className="inline-block w-20 h-10 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                `${stats.totalDonors.toLocaleString()}+`
              )}
            </p>

            <p className="mt-2 text-lg font-medium text-[var(--color-text-main)]">
              নিবন্ধিত রক্তদাতা
            </p>

            <p className="mt-2 text-sm text-[var(--color-text-soft)]">
              নিয়মিত সক্রিয় ডোনারদের সংখ্যা
            </p>
          </div>

          {/* Areas */}
          <div className="card flex flex-col items-center">
            <div className="text-6xl">📍</div>

            <p className="mt-5 text-4xl font-extrabold text-[var(--color-primary)]">
              {loading ? (
                <span className="inline-block w-20 h-10 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                `${stats.areas}+`
              )}
            </p>

            <p className="mt-2 text-lg font-medium text-[var(--color-text-main)]">
              উপজেলার কভারেজ
            </p>

            <p className="mt-2 text-sm text-[var(--color-text-soft)]">
              কুমিল্লার বিভিন্ন এলাকা যুক্ত
            </p>
          </div>

          {/* Blood Groups */}
          <div className="card flex flex-col items-center">
            <div className="text-6xl">🩸</div>

            <p className="mt-5 text-4xl font-extrabold text-[var(--color-primary)]">
              {loading ? (
                <span className="inline-block w-20 h-10 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                stats.bloodGroups
              )}
            </p>

            <p className="mt-2 text-lg font-medium text-[var(--color-text-main)]">
              রক্তের গ্রুপ
            </p>

            <p className="mt-2 text-sm text-[var(--color-text-soft)]">
              সকল সাধারণ ব্লাড গ্রুপ উপলব্ধ
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}