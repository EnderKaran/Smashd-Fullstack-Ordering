// app/layout.tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"; // Bildirimleri ekrana basar

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smash'd Burger | QR Menu",
  description: "Masadan hızlı sipariş sistemi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${geist.className} antialiased bg-[#FAF9F6]`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}