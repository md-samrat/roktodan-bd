"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImageToImgbb } from "@/lib/uploadImage";
import { FaLocationDot, FaMobile } from "react-icons/fa6";
import DonationSection from "@/components/DonationSection/DonationSection";

export default function ProfilePage() {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    bloodGroup: "",
    address: "",
    gender: "",
    profileImage: "",
    email: "",
  });

  // ইউজার ডাটা লোড করা
  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // টোকেন থেকে বেসিক ইনফো নেয়া
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        
        setUserData({
          id: payload.id || "",
          name: payload.name || "",
          phoneNumber: payload.phoneNumber || "",
          bloodGroup: payload.bloodGroup || "",
          address: payload.address || "",
          gender: payload.gender || "",
          profileImage: payload.profileImage || "",
          email: payload.email || "",
        });
      } catch (error) {
        console.error("Error loading user data:", error);
        router.push("/login");
      }
    };

    loadUserData();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // UI Avatar URL তৈরি
  const getAvatarUrl = () => {
    const name = userData.name || "User";
    return `https://ui-avatars.com/api/?background=0D8F81&color=fff&name=${encodeURIComponent(name)}&size=128`;
  };

  // প্রোফাইল সেভ করা
  const handleSave = async () => {
    setLoading(true);
    setUploadingImage(true);

    try {
      let imageUrl = userData.profileImage;

      // ইমেজ আপলোড
      if (imageFile) {
        const uploadedUrl = await uploadImageToImgbb(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          imageUrl = "";
        }
      }

      // আপডেট ডাটা প্রস্তুত
      const updateData = {
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        bloodGroup: userData.bloodGroup,
        address: userData.address,
        gender: userData.gender,
        profileImage: imageUrl,
      };

      // API কল
      const response = await fetch(`/api/users/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      // নতুন টোকেন স্টোর করা এবং ডাটা আপডেট
      if (result.token) {
        localStorage.setItem("token", result.token);
        
        // নতুন টোকেন থেকে ইউজার ডাটা এক্সট্রাক্ট করুন
        const base64Payload = result.token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        
        // লোকাল স্টেট আপডেট করুন
        setUserData({
          id: payload.id || "",
          name: payload.name || "",
          phoneNumber: payload.phoneNumber || "",
          bloodGroup: payload.bloodGroup || "",
          address: payload.address || "",
          gender: payload.gender || "",
          profileImage: payload.profileImage || imageUrl,
          email: payload.email || "",
        });
        
        // Navbar এবং Donors পেজ আপডেটের জন্য ইভেন্ট ডিসপ্যাচ
        window.dispatchEvent(new Event("authChange"));
        window.dispatchEvent(new Event("profileUpdated"));
      }

      setEditOpen(false);
      setImageFile(null);
      setShowSuccessModal(true);
      
      // 2 সেকেন্ড পর মডাল বন্ধ করুন
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

  return (
    <section className="min-h-screen flex items-center justify-center py-10 px-4">
      {/* PROFILE CARD */}
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8 text-center">
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

          <h2 className="mt-4 text-2xl font-bold">
            {userData.name || "User"}
          </h2>

          <p className="text-gray-500">{userData.phoneNumber}</p>

          {/* EDIT BUTTON */}
          <button
            onClick={() => setEditOpen(true)}
            className="mt-6 px-6 py-2 bg-[var(--color-primary)] text-white rounded-full"
          >
            Edit Profile
          </button>
        </div>

        {/* INFO */}
        <div className="mt-10 text-left space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="flex items-center gap-3"><FaMobile color="blue"/> Phone</span>
            <span>{userData.phoneNumber || "Not set"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>🩸 Blood Group</span>
            <span>{userData.bloodGroup || "Not set"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="flex items-center gap-3"><FaLocationDot color="green"/> Address</span>
            <span>{userData.address || "Not set"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>👤 Gender</span>
            <span>{userData.gender || "Not set"}</span>
          </div>
        </div>
        <DonationSection />
      </div>
            
      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-5">Edit Profile</h2>

            {/* IMAGE UPLOAD */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : (userData.profileImage || getAvatarUrl())
                }
                alt="Preview"
                className="w-28 h-28 rounded-full border-4 object-cover"
              />

              <label className="mt-3 cursor-pointer text-[var(--color-primary)] font-medium">
                {uploadingImage ? "Uploading..." : "Upload Photo"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  disabled={uploadingImage}
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (Max 5MB)</p>
            </div>

            {/* INPUTS */}
            <div className="space-y-3">
              <input
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />

              <input
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />

              <select
                name="bloodGroup"
                value={userData.bloodGroup}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="">Select Blood Group</option>
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
                placeholder="Address"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />

              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="">Select Gender</option>
                <option value="Male">পুরুষ</option>
                <option value="Female">মহিলা</option>
                <option value="Other">অন্যান্য</option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setEditOpen(false);
                  setImageFile(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={loading || uploadingImage}
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ SUCCESS MODAL */}
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
              সফল হয়েছে!
            </h2>

            <p className="text-gray-600">
              আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে।
            </p>
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