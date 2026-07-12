"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImageToImgbb } from "@/lib/uploadImage";
import { FaLocationDot, FaMobile, FaCalendar } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import DonationSection from "@/components/DonationSection/DonationSection";

interface UserData {
  id: string;
  name: string;
  phoneNumber: string;
  bloodGroup: string;
  address: string;
  gender: string;
  profileImage: string | null;
  lastDonationDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ ইউজার ডাটা লোড করা
  const loadUserData = async () => {
    const token = localStorage.getItem("token");
    
    //console.log("Token from localStorage:", token); // ডিবাগিং

    if (!token) {
      //console.log("No token found, redirecting to login");
      router.push("/login");
      return;
    }

    try {
      // টোকেন থেকে id বের করা
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      //console.log("Decoded token payload:", payload); // ডিবাগিং
      
      const userId = payload.id;
      //console.log("User ID from token:", userId); // ডিবাগিং

      if (!userId) {
        //console.log("No user ID in token, redirecting to login");
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      // ✅ API থেকে ডেটা fetch
      //console.log("Fetching user data from API...");
      const response = await fetch(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //console.log("API response status:", response.status); // ডিবাগিং

      if (!response.ok) {
        if (response.status === 401 || response.status === 404) {
          //console.log("Unauthorized or not found, redirecting to login");
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      //console.log("API response data:", data); // ডিবাগিং
      
      if (data.success && data.user) {
        setUserData(data.user);
      } else {
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (userData) {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const getAvatarUrl = () => {
    const name = userData?.name || "User";
    return `https://ui-avatars.com/api/?background=0D8F81&color=fff&name=${encodeURIComponent(name)}&size=128`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    router.push("/");
  };

  const handleSave = async () => {
    if (!userData) return;
    
    setLoading(true);
    setUploadingImage(true);

    try {
      let imageUrl = userData.profileImage;

      if (imageFile) {
        const uploadedUrl = await uploadImageToImgbb(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const updateData = {
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        bloodGroup: userData.bloodGroup,
        address: userData.address,
        gender: userData.gender,
        profileImage: imageUrl,
      };

      const token = localStorage.getItem("token");

      const response = await fetch(`/api/users/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      await loadUserData();

      setEditOpen(false);
      setImageFile(null);
      setShowSuccessModal(true);
      
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
      
    } catch (error: any) {
      console.error("Save error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "দেওয়া হয়নি";
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ✅ লোডিং স্টেট
  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">প্রোফাইল লোড হচ্ছে...</p>
        </div>
      </section>
    );
  }

  // ✅ ইউজার ডেটা না থাকলে
  if (!userData) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">প্রোফাইল লোড করতে সমস্যা হয়েছে</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg"
          >
            লগইন পেজে যান
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl w-full p-8 text-center">
          
          {/* Logout Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="text-red-500 hover:text-red-700 transition flex items-center gap-2 text-sm"
            >
              <FaSignOutAlt />
              লগআউট
            </button>
          </div>

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center">
            <img
              src={userData.profileImage || getAvatarUrl()}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-[var(--color-primary)] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getAvatarUrl();
              }}
            />

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {userData.name || "User"}
            </h2>

            <p className="text-gray-500 flex items-center gap-2">
              <FaMobile className="text-blue-500" />
              {userData.phoneNumber}
            </p>

            <span className="mt-2 px-4 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm font-semibold">
              🩸 {userData.bloodGroup || "Not Set"}
            </span>

            <button
              onClick={() => setEditOpen(true)}
              className="mt-6 px-6 py-2 bg-[var(--color-primary)] text-white rounded-full hover:bg-green-700 transition"
            >
              ✏️ প্রোফাইল আপডেট করুন
            </button>
          </div>

          {/* INFO */}
          <div className="mt-10 text-left space-y-4 bg-gray-50 p-6 rounded-xl">
            <div className="flex justify-between border-b pb-3">
              <span className="flex items-center gap-3 font-medium text-gray-600">
                <FaMobile className="text-blue-500" /> ফোন
              </span>
              <span className="text-gray-800">{userData.phoneNumber || "Not set"}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-medium text-gray-600">🩸 রক্তের গ্রুপ</span>
              <span className="text-gray-800">{userData.bloodGroup || "Not set"}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="flex items-center gap-3 font-medium text-gray-600">
                <FaLocationDot className="text-green-500" /> ঠিকানা
              </span>
              <span className="text-gray-800 text-right">{userData.address || "Not set"}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-medium text-gray-600">👤 লিঙ্গ</span>
              <span className="text-gray-800">
                {userData.gender === "Male" ? "পুরুষ" : 
                 userData.gender === "Female" ? "মহিলা" : 
                 userData.gender || "Not set"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="flex items-center gap-3 font-medium text-gray-600">
                <FaCalendar className="text-purple-500" /> সর্বশেষ রক্তদান
              </span>
              <span className="text-gray-800">{formatDate(userData.lastDonationDate)}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-600">📅 সদস্য হন</span>
              <span className="text-gray-800 text-sm">{formatDate(userData.createdAt)}</span>
            </div>
          </div>
          
          <DonationSection />
        </div>
      </div>
            
      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-5 text-gray-800">✏️ প্রোফাইল আপডেট করুন</h2>

            <div className="flex flex-col items-center mb-6">
              <img
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : (userData.profileImage || getAvatarUrl())
                }
                alt="Preview"
                className="w-28 h-28 rounded-full border-4 border-[var(--color-primary)] object-cover"
              />

              <label className="mt-3 cursor-pointer text-[var(--color-primary)] font-medium hover:underline">
                {uploadingImage ? "⏳ আপলোড হচ্ছে..." : "📸 ছবি পরিবর্তন করুন"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  disabled={uploadingImage}
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG (Max 5MB)</p>
            </div>

            <div className="space-y-3">
              <input
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="পুরো নাম"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />

              <input
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                placeholder="মোবাইল নাম্বার"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />

              <select
                name="bloodGroup"
                value={userData.bloodGroup}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
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

              <input
                name="address"
                value={userData.address}
                onChange={handleChange}
                placeholder="ঠিকানা (জেলা, বিভাগ সহ)"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />

              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="">লিঙ্গ নির্বাচন করুন</option>
                <option value="Male">পুরুষ</option>
                <option value="Female">মহিলা</option>
                <option value="Other">অন্যান্য</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setEditOpen(false);
                  setImageFile(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
                disabled={loading}
              >
                বন্ধ করুন
              </button>

              <button
                onClick={handleSave}
                disabled={loading || uploadingImage}
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "⏳ সংরক্ষণ..." : "💾 সংরক্ষণ করুন"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl w-[90%] max-w-md transform transition-all animate-scaleUp">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-green-600 mb-3">
              ✅ সফল হয়েছে!
            </h2>

            <p className="text-gray-600">
              আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে।
            </p>
          </div>
        </div>
      )}

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl w-[90%] max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSignOutAlt className="text-3xl text-red-600" />
            </div>

            <h2 className="text-2xl font-bold text-red-600 mb-3">
              ⚠️ লগআউট করুন?
            </h2>

            <p className="text-gray-600 mb-6">
              আপনি কি নিশ্চিত যে লগআউট করতে চান?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                বন্ধ করুন
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                লগআউট করুন
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleUp {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}