import { CheckCircle, Users, ShoppingBag, Megaphone, GraduationCap, Camera, BarChart3, Globe, Wifi, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Firstfarms Digital Cooperative",
  description: "Digital platform services for cooperative agriculture in Cameroon — cooperative management, market access, digital marketing, and education.",
};

const pillars = [
  {
    icon: Users,
    title: "Cooperative Management",
    bg: "bg-primary",
    description:
      "End-to-end digital tools for cooperative leaders to manage members, track production, and coordinate operations across all 10 regions.",
    features: [
      "Member registry & digital profiles",
      "Production tracking & reporting",
      "Internal communication tools",
      "Governance documentation & transparency",
    ],
    cta: { label: "Become a Member", href: "/membership" },
  },
  {
    icon: ShoppingBag,
    title: "Market Access",
    bg: "bg-secondary",
    textDark: true,
    description:
      "Connect cooperative products directly with verified buyers, wholesalers, and processors. WhatsApp-first ordering for the Cameroonian market.",
    features: [
      "Fresh produce & crop listings",
      "Buyer-seller direct connections",
      "Wellness & natural products marketplace",
      "Order coordination & tracking",
    ],
    cta: { label: "Visit Marketplace", href: "/marketplace" },
  },
  {
    icon: Megaphone,
    title: "Digital Marketing & Social Media",
    bg: "bg-accent",
    description:
      "Professional content creation and social media management for cooperatives and agribusinesses ready to grow their online presence.",
    features: [
      "Product photography & creative content",
      "Social media page setup & management",
      "Campaign promotion & brand awareness",
      "Digital branding packages for cooperatives",
    ],
    cta: { label: "Advertise With Us", href: "/contact" },
  },
  {
    icon: GraduationCap,
    title: "Training & Education",
    bg: "bg-primary",
    description:
      "Practical, science-based training programs for farmers covering soil health, post-harvest management, and agribusiness financial literacy.",
    features: [
      "Soil management & crop rotation",
      "Post-harvest handling & storage",
      "Business & financial literacy",
      "Digital tools for modern farming",
    ],
    cta: { label: "View Programs", href: "/education" },
  },
];

const valueAdded = [
  {
    icon: Camera,
    title: "Digital Branding",
    desc: "Logo, page setup, and full brand identity for cooperatives launching their online presence for the first time.",
  },
  {
    icon: BarChart3,
    title: "Data Reporting",
    desc: "Impact dashboards, production reports, and analytics for NGO partners and development institutions.",
  },
  {
    icon: Globe,
    title: "Partner Integration",
    desc: "Data pipelines and integration support for telecom providers, cooperative unions, and ICT institutions.",
  },
  {
    icon: Wifi,
    title: "Market Price Alerts",
    desc: "Real-time commodity price updates delivered via WhatsApp and the platform directly to farmers.",
  },
];

const roadmap = [
  { year: "2026", focus: "Platform Build", desc: "Needs assessment, design, app & website development, and pilot preparation.", active: true },
  { year: "2027", focus: "Pilot Launch", desc: "Onboard 20+ cooperatives, 1,500 members, and launch training programs." },
  { year: "2028", focus: "National Rollout", desc: "Expand to 5,000+ members across all 10 regions with full market access." },
  { year: "2029", focus: "Revenue Growth", desc: "Mixed revenue from subscriptions, services, and transaction commissions." },
  { year: "2030", focus: "Sustainability", desc: "Platform fully self-sustaining — scalable nationwide without grant reliance." },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 75% 50%, #F9A825 0%, transparent 65%)" }}
        />
        <div className="container mx-auto px-6 max-w-[1160px] relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 border border-white/20 text-secondary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Five-Year Platform · 2026 – 2030
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 leading-tight">
              A Complete Digital Platform for Cooperative Agriculture
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              From managing cooperative members to connecting farmers with buyers — Firstfarms Digital Cooperative provides
              the digital infrastructure that smallholder cooperatives need to grow, coordinate, and thrive.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/membership"
                className="bg-secondary text-accent font-bold px-8 py-4 rounded-2xl hover:bg-secondary/90 transition-all hover:shadow-xl active:scale-95"
              >
                Join the Cooperative
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-14 bg-secondary/10 border-y border-secondary/20">
        <div className="container mx-auto px-6 max-w-[1160px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "5,000+", label: "Target Members by 2028" },
              { value: "20+", label: "Cooperatives in Pilot 2027" },
              { value: "10", label: "Regions of Cameroon" },
              { value: "2030", label: "Financial Self-Sustaining" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-primary font-poppins mb-1">{s.value}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-24 container mx-auto px-6 max-w-[1160px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary mb-4">Four Service Pillars</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Every service is built around the real needs of cooperatives, farmers, and buyers across Cameroon.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
            >
              <div className={`${p.bg} p-8 flex items-center gap-4`}>
                <div className="bg-white/20 p-3 rounded-2xl">
                  <p.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-poppins text-white">{p.title}</h3>
              </div>
              <div className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6">{p.description}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.cta.href}
                  className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm group/btn"
                >
                  {p.cta.label}
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Value-Added Services */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-[1160px]">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-poppins text-primary mb-4">Value-Added Services</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Specialized offerings for cooperatives, NGOs, and development partners.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueAdded.map((v, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-lg font-bold font-poppins text-primary mb-3">{v.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Year Roadmap */}
      <section className="py-24 container mx-auto px-6 max-w-[1160px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-poppins text-primary mb-4">Five-Year Rollout Plan</h2>
          <p className="text-gray-500 max-w-xl mx-auto">A phased path from pilot to national scale and full financial sustainability.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {roadmap.map((r, i) => (
            <div
              key={i}
              className={`p-6 rounded-3xl text-center relative ${
                r.active
                  ? "bg-secondary shadow-lg shadow-secondary/20"
                  : "bg-primary/5 border border-primary/10"
              }`}
            >
              {r.active && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Current
                </span>
              )}
              <p className={`text-3xl font-bold font-poppins mb-1 ${r.active ? "text-accent" : "text-primary"}`}>
                {r.year}
              </p>
              <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${r.active ? "text-accent" : "text-primary"}`}>
                {r.focus}
              </p>
              <p className={`text-xs leading-relaxed ${r.active ? "text-accent/80" : "text-gray-500"}`}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 max-w-[1160px] text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-6">
            Ready to Build the Future of Cooperative Agriculture?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're a cooperative, an NGO, a buyer, or an agribusiness — Firstfarms Digital Cooperative has a service built for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/membership"
              className="bg-secondary text-accent font-bold px-10 py-4 rounded-2xl hover:bg-secondary/90 transition-all hover:shadow-xl active:scale-95"
            >
              Join as a Member
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/30 text-white font-bold px-10 py-4 rounded-2xl hover:bg-white/10 transition-all"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
