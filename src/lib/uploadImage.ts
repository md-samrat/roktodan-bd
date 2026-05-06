// lib/uploadImage.ts
export async function uploadImageToImgbb(file: File): Promise<string> {
  try {
    // ফাইল সাইজ চেক (5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be less than 5MB");
    }

    const formData = new FormData();
    formData.append("image", file);

    // API key সরাসরি ব্যবহার করা হচ্ছে (টেস্টিং এর জন্য)
    const apiKey = "6a180c386f99a189b1108de98ef769ed";
    
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.success) {
      console.error("ImgBB Error:", data);
      throw new Error(data.error?.message || "Image upload failed");
    }

    return data.data.url;
  } catch (error) {
    console.error("Upload error:", error);
    // ইমেজ আপলোড fail হলে UI Avatar ব্যবহার করবে
    return "";
  }
}