"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [dark, setDark] = useState(false);

  const handleSetDark = () => {
    setDark(!dark);
  };

  return (
    <html lang="zh" className={dark ? "dark" : ""}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* page container */}
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 w-full">
          {/* inner */}
          <div className="flex flex-col max-h-full max-w-full p-0">
            {children}
          </div>

          {/* dark mode button */}
          <div className="z-10 fixed bottom-2 right-4">
            <button
              onClick={handleSetDark}
              className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition-colors text-white"
            >
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {/* footer */}
          <footer className="z-19 fixed bottom-0 w-full bg-gray-800 text-white p-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 Cdog Shen. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
