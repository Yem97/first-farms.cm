import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  title: "Firstfarms Digital Cooperative | Empowering Smallholder Farmers Through Digital Innovation",
  description: "Firstfarms Digital Cooperative Cameroon — a youth- and women-led digital agricultural cooperative. Home of AgriExpert AI, our AI-powered agri-education and smart-farming platform across agriculture, livestock, fisheries, animal industries, forestry and wildlife.",
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
