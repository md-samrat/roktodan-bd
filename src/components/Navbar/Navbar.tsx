"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  // টোকেন লোড করার ফাংশন
  const loadToken = () => {
    const t = localStorage.getItem("token");
    setToken(t);
    
    if (t) {
      try {
        const base64Payload = t.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        setUser(payload);
      } catch (error) {
        console.error("Invalid token");
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadToken();

    const handleStorageChange = () => {
      loadToken();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/donors?group=${search}`);
    setSearch("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    loadToken();
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* 📱 মোবাইল ডিভাইস */}
        <div className="flex md:hidden items-center gap-3 w-full">
          <button onClick={() => setOpen(true)} className="text-3xl text-[var(--color-primary)]">
            ☰
          </button>

          <Link href="/" className="text-xl font-bold text-[var(--color-primary)]">
            রক্তদান
          </Link>

          <form onSubmit={handleSearch} className="flex ml-auto border rounded-lg overflow-hidden">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-2 py-1.5 w-24 text-sm outline-none"
              placeholder="A+"
            />
            <button className="bg-[var(--color-primary)] text-white px-2 text-sm">🔍</button>
          </form>

          {/* প্রোফাইল আইকন (মোবাইলে) */}
          {token ? (
            <Link href="/profile">
              <img
                src={user?.profileImage || "/profile.png"}
                alt="profile"
                className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] object-cover"
              />
            </Link>
          ) : (
            <Link href="/login">
              <button className="px-3 py-1.5 border rounded-lg text-sm">
                লগইন
              </button>
            </Link>
          )}
        </div>

        {/* 💻 ডেস্কটপ ডিভাইস */}
        <div className="hidden md:flex items-center justify-between w-full">
          <Link href="/" className="text-3xl font-bold text-[var(--color-primary)]">
            রক্তদান
          </Link>

          <div className="flex gap-8 font-medium">
            <Link href="/" className="hover:text-[var(--color-primary)]">হোম</Link>
            <Link href="/about" className="hover:text-[var(--color-primary)]">আমাদের সম্পর্কে</Link>
            <Link href="/donors" className="hover:text-[var(--color-primary)]">রক্তদাতা</Link>
          </div>

          <form onSubmit={handleSearch} className="flex border rounded-lg overflow-hidden">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-44 outline-none"
              placeholder="A+, B-"
            />
            <button className="bg-[var(--color-primary)] text-white px-4">
              খুঁজুন
            </button>
          </form>

          <div className="flex items-center gap-3">
            {token ? (
              <>
                <Link href="/profile">
                  <div className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-lg">
                    <img
                      src={user?.profileImage || "/profile.png"}
                      className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] object-cover"
                    />
                    <span className="text-sm font-medium">{user?.name || "প্রোফাইল"}</span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 border rounded-lg text-red-500 hover:bg-red-50 transition"
                >
                  লগআউট
                </button>
              </>
            ) : (
              <>
                <Link href="/register">
                  <button className="btn-primary px-4 py-1.5">
                    রেজিস্ট্রেশন
                  </button>
                </Link>

                <Link href="/login">
                  <button className="px-4 py-1.5 border rounded-lg hover:bg-gray-50">
                    লগইন
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 🍔 হ্যামবার্গার মেনু (সাইড ড্রয়ার) */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setOpen(false)}>
          <div className="bg-white w-72 h-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* প্রোফাইল হেডার */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              {token ? (
                <div className="flex items-center gap-3">
                  <img
                    src={user?.profileImage || "/profile.png"}
                    className="w-12 h-12 rounded-full border-2 border-[var(--color-primary)] object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{user?.name || "ইউজার"}</p>
                    <p className="text-xs text-gray-500">{user?.phoneNumber || ""}</p>
                  </div>
                </div>
              ) : (
                <h2 className="text-xl font-bold text-[var(--color-primary)]">মেনু</h2>
              )}
              <button onClick={() => setOpen(false)} className="text-2xl text-gray-500">
                ✕
              </button>
            </div>
            
            {/* মেনু আইটেম */}
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                onClick={() => setOpen(false)} 
                className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-lg transition"
              >
                <span>🏠</span> হোম
              </Link>
              
              <Link 
                href="/about" 
                onClick={() => setOpen(false)} 
                className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-lg transition"
              >
                <span>📖</span> আমাদের সম্পর্কে
              </Link>
              
              <Link 
                href="/donors" 
                onClick={() => setOpen(false)} 
                className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-lg transition"
              >
                <span>🩸</span> রক্তদাতা
              </Link>
              
              <hr className="my-2" />
              
              {token ? (
                <>
                  <Link 
                    href="/profile" 
                    onClick={() => setOpen(false)} 
                    className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-lg transition"
                  >
                    <span>👤</span> প্রোফাইল
                  </Link>
                  
                  {/* 👇 লগআউট বাটন (হ্যামবার্গার মেনুতেই) */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition mt-2"
                  >
                    <span>🚪</span> লগআউট
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/register" 
                    onClick={() => setOpen(false)} 
                    className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-lg transition"
                  >
                    <span>📝</span> রেজিস্ট্রেশন
                  </Link>
                  
                  <Link 
                    href="/login" 
                    onClick={() => setOpen(false)} 
                    className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-lg transition"
                  >
                    <span>🔑</span> লগইন
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}