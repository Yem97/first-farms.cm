import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  title: "AgriTech Hub — AgriExpert AI | Intelligent Agro-Ecosystem Diagnosis",
  description: "AgriTech & Wildlife Incubation Hub for Digital Innovation. AgriExpert AI combines Artificial Intelligence with field data to diagnose plant diseases, animal pathologies, water quality, and forest ecosystems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased text-text bg-background`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
