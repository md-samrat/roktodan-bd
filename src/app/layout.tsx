import type { Metadata } from "next";
import { Lora, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

// ইংরেজি ফন্ট
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

// বাংলা ফন্ট (সঠিক রেন্ডারিংয়ের জন্য)
const hindSiliguri = Hind_Siliguri({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: {
    default: "রক্তদান - জীবন বাঁচানোর সংগ্রাম",
    template: "%s | রক্তদান",
  },
  description: "বাংলাদেশের বৃহত্তম রক্তদান প্ল্যাটফর্ম",
  keywords: ["রক্তদান", "ব্লাড ডোনেশন", "বাংলাদেশ", "জরুরি সেবা"],
  authors: [{ name: "রক্তদান টিম" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html 
      lang="bn" 
      className={`${lora.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <head>
        {/* <script src="https://quge5.com/88/tag.min.js" data-zone="261358" async data-cfasync="false"></script> */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1838519377820773"
          crossOrigin="anonymous"
        />
        {/* ব্রাউজারের ভাষা সেটিংস নির্বিশেষে বাংলা কন্টেন্ট ঠিক রাখতে */}
        <meta name="language" content="Bengali" />
        <meta httpEquiv="Content-Language" content="bn" />
      </head>
      <body className="min-h-full flex flex-col font-hind">
        <header>
          <Navbar />
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}