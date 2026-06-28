import { client } from "@/sanity/lib/client";
import { featuredProductsQuery, upcomingTrainingsQuery, testimonialsQuery, teamMembersQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import TrainingCard from "@/components/TrainingCard";
import {
  Users, ShoppingBag, GraduationCap, ChevronRight, Quote,
  CheckCircle, Megaphone, ArrowRight, Leaf,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

/* ── Types ──────────────────────────────────────────────────────── */
interface Testimonial {
  _id?: string;
  quote: string;
  farmerName: string;
  region: string;
  photo?: { asset: { _ref: string; _type: string } };
  localPhoto?: string;
}

interface Product {
  _id: string;
  name: string;
  price: string;
  farmerName?: string;
  region?: string;
  category?: string;
  image?: { asset: { _ref: string; _type: string } };
  localImage?: string;
  whatsappNumber?: string;
}

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: { asset: { _ref: string; _type: string } };
  localPhoto?: string;
}

/* ── Fallback data ───────────────────────────────────────────────── */
const fallbackTestimonials: Testimonial[] = [
  {
    _id: "ft1",
    quote: "Since joining First Farms, I have doubled my income by selling directly to buyers in Douala. No more middlemen taking our profits.",
    farmerName: "Celestin Bakam",
    region: "Adamaoua",
    localPhoto: "/images/avatars/testimonial-1.svg",
  },
  {
    _id: "ft2",
    quote: "The training on soil management completely changed how I grow my tomatoes. My harvest is now three times bigger and healthier.",
    farmerName: "Beatrice Ngono",
    region: "Littoral",
    localPhoto: "/images/avatars/testimonial-2.svg",
  },
  {
    _id: "ft3",
    quote: "First Farms gave me access to tools, storage, and markets I never thought I could reach as a small farmer in the North.",
    farmerName: "Ibrahim Yaya",
    region: "Nord",
    localPhoto: "/images/avatars/testimonial-3.svg",
  },
];

const fallbackProducts: Product[] = [
  { _id: "fp1", name: "Premium Plantains",      price: "5,000 XAF / bunch", farmerName: "Celestin Bakam",    region: "Littoral",  category: "Fruits"     },
  { _id: "fp2", name: "Fresh Tomatoes (25 kg)", price: "15,000 XAF",        farmerName: "Fatima Aboubakar",  region: "Adamaoua",  category: "Vegetables" },
  { _id: "fp3", name: "Moringa Powder (500 g)", price: "8,000 XAF",         farmerName: "Green Valley Farm", region: "Sud-Ouest", category: "Processed"  },
  { _id: "fp4", name: "Organic Maize (50 kg)",  price: "20,000 XAF",        farmerName: "Jean-Baptiste Mbo", region: "Ouest",     category: "Grains"     },
];

const fallbackTeam: TeamMember[] = [
  { _id: "tm1", name: "Amadou Nkwemo",     role: "Co-Founder & CEO",      localPhoto: "/images/avatars/team-1.svg" },
  { _id: "tm2", name: "Amina Tchaptchet",  role: "Head of Operations",    localPhoto: "/images/avatars/team-2.svg" },
  { _id: "tm3", name: "Jean-Paul Mbarga",  role: "Agricultural Director", localPhoto: "/images/avatars/team-3.svg" },
  { _id: "tm4", name: "Fatima Aboubakar", role: "Community Liaison",     localPhoto: "/images/avatars/team-4.svg" },
];

const partners = [
  { name: "AgroTech Littoral", initial: "AT", color: "#1B5E20" },
  { name: "GreenGrow Fund",    initial: "GG", color: "#00695C" },
  { name: "SeedFirst CM",      initial: "SF", color: "#F9A825" },
  { name: "FarmLink Network",  initial: "FL", color: "#0277BD" },
  { name: "EcoHarvest Africa", initial: "EH", color: "#2E7D32" },
  { name: "NourishCM",         initial: "NC", color: "#E65100" },
];

/* ── Page ────────────────────────────────────────────────────────── */
export default async function Home() {
  let featuredProducts: Product[]    = [];
  let upcomingTrainings: unknown[]   = [];
  let testimonials: Testimonial[]    = [];
  let teamMembers: TeamMember[]      = [];

  try {
    [featuredProducts, upcomingTrainings, testimonials, teamMembers] = await Promise.all([
      client.fetch(featuredProductsQuery),
      client.fetch(upcomingTrainingsQuery),
      client.fetch(testimonialsQuery),
      client.fetch(teamMembersQuery),
    ]);
  } catch {
    // Sanity not configured — fallback content used
  }

  const displayProducts     = featuredProducts.length  > 0 ? featuredProducts  : fallbackProducts;
  const displayTestimonials = testimonials.length       > 0 ? testimonials       : fallbackTestimonials;
  const displayTeam         = teamMembers.length        > 0 ? teamMembers        : fallbackTeam;

  return (
    <div className="bg-background">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── STATS CARD — straddles hero / content boundary ─────────── */}
      <div className="relative z-30 -mt-14">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="bg-white rounded-3xl shadow-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 border border-gray-100">
            {[
              { value: "500+",  label: "Active Farmers" },
              { value: "12",    label: "Regions" },
              { value: "200+",  label: "Products" },
              { value: "50+",   label: "Verified Buyers" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary font-poppins leading-none mb-1">{s.value}</p>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT SNIPPET ─────────────────────────────────────────── */}
      <section className="pt-20 pb-20 mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Image block */}
          <div className="w-full lg:w-1/2 relative flex-shrink-0">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Cameroonian Farmers"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating quote card */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-secondary px-7 py-5 rounded-2xl shadow-xl hidden md:block max-w-[220px]">
              <p className="text-accent font-bold text-sm leading-snug">
                &ldquo;Stronger Together, Producing Excellence.&rdquo;
              </p>
            </div>
            {/* Green accent badge */}
            <div className="absolute -top-4 -left-4 bg-primary text-white px-4 py-2 rounded-xl shadow-lg hidden md:flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Est. 2020</span>
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="inline-block text-primary font-bold uppercase tracking-widest text-xs px-3 py-1.5 bg-primary/10 rounded-full">
              Our Vision
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary leading-tight">
              Connecting Cameroonian Farmers to Greater Opportunities
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              First Farms Cameroon is more than a cooperative — it is a community of innovators pooling
              resources, knowledge, and connections to transform Cameroonian agriculture from North to South.
            </p>
            <ul className="space-y-3">
              {[
                "Direct market access — no middlemen",
                "Professional training in modern farming",
                "Collective strength across 10 regions",
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors group"
            >
              Discover Our Full Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── COOPERATIVE BENEFITS ──────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto px-6 max-w-[1200px]">
          <div className="text-center mb-14">
            <span className="inline-block text-secondary font-bold uppercase tracking-widest text-xs px-3 py-1.5 bg-secondary/10 rounded-full mb-4">
              Why Join Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary">
              Everything You Need to Grow
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingBag,
                title: "Direct Marketplace",
                desc:  "Sell your harvest directly to buyers across Cameroon with no middlemen taking your profits.",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: GraduationCap,
                title: "Farmer Education",
                desc:  "Hands-on workshops in soil management, post-harvest handling, and agribusiness skills.",
                color: "bg-secondary/20 text-accent",
              },
              {
                icon: Users,
                title: "Collective Power",
                desc:  "Bargaining strength for seeds, equipment, storage, and logistics across all 10 regions.",
                color: "bg-accent/10 text-accent",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${card.color}`}>
                  <card.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-poppins text-primary mb-3">{card.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────── */}
      <section className="py-20 mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-secondary font-bold uppercase tracking-widest text-xs block mb-2">
              Fresh From Farmers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary">
              Top Harvests This Season
            </h2>
          </div>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white px-6 py-3 rounded-xl font-bold transition-all text-sm"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* ── TRAINING / EDUCATION ──────────────────────────────────── */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #F9A825 0%, transparent 50%)" }}
        />
        <div className="mx-auto px-6 max-w-[1200px] relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-secondary font-bold uppercase tracking-widest text-xs block mb-2">
                Knowledge Is Power
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white">
                Grow Your Agricultural Skills
              </h2>
            </div>
            <Link
              href="/education"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold transition-all text-sm"
            >
              Full Program <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {upcomingTrainings.length > 0 ? (
              upcomingTrainings.map((event) => (
                <div key={(event as { _id: string })._id}>
                  <TrainingCard event={event as Parameters<typeof TrainingCard>[0]["event"]} />
                </div>
              ))
            ) : (
              <div className="bg-white/10 border border-white/20 rounded-3xl p-12 text-center">
                <GraduationCap className="w-12 h-12 text-secondary mx-auto mb-4 opacity-70" />
                <p className="text-white font-semibold text-lg mb-2">New sessions being scheduled</p>
                <p className="text-gray-300 text-sm">
                  Check back soon or{" "}
                  <Link href="/education" className="text-secondary underline underline-offset-2 hover:no-underline">
                    register your interest
                  </Link>.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────── */}
      <section className="py-20 mx-auto px-6 max-w-[1200px]">
        <div className="text-center mb-14">
          <span className="inline-block text-secondary font-bold uppercase tracking-widest text-xs px-3 py-1.5 bg-secondary/10 rounded-full mb-4">
            The People Behind It
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary">
            Meet the Team
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Dedicated professionals driving the cooperative's mission across Cameroon.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {displayTeam.map((member) => {
            const photoSrc = member.localPhoto
              ? member.localPhoto
              : member.photo
              ? urlFor(member.photo).url()
              : null;
            return (
              <div key={member._id} className="flex flex-col items-center text-center group">
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg ring-2 ring-primary/20 group-hover:ring-secondary transition-all">
                  {photoSrc ? (
                    <Image src={photoSrc} alt={member.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-10 h-10 text-primary/40" />
                    </div>
                  )}
                </div>
                <h4 className="font-bold font-poppins text-primary text-base leading-tight">{member.name}</h4>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{member.role}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link href="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors">
            Meet the full team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto px-6 max-w-[1200px]">
          <div className="text-center mb-14">
            <span className="inline-block text-secondary font-bold uppercase tracking-widest text-xs px-3 py-1.5 bg-secondary/10 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary">
              Every Farm Has a Story
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.map((t, idx) => {
              const photoSrc = t.localPhoto
                ? t.localPhoto
                : t.photo
                ? urlFor(t.photo).url()
                : null;
              return (
                <div
                  key={t._id ?? idx}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col h-full"
                >
                  <Quote className="w-8 h-8 text-secondary/50 mb-5" />
                  <p className="text-gray-600 italic leading-relaxed flex-grow mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                    {photoSrc && (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-secondary">
                        <Image src={photoSrc} alt={t.farmerName} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-primary text-sm">{t.farmerName}</p>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{t.region} Region</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────── */}
      <section className="py-20 bg-accent">
        <div className="mx-auto px-6 max-w-[1200px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-3">
                Ready to Join the Cooperative?
              </h2>
              <p className="text-gray-300 text-lg">
                Become a member today and access markets, training, and community support.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-accent font-bold px-8 py-4 rounded-2xl hover:bg-secondary/90 transition-all hover:shadow-xl active:scale-95"
              >
                <Users className="w-5 h-5" />
                Join Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ──────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="mx-auto px-6 max-w-[1200px]">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-10">
            Trusted By Our Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {partners.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center gap-2 group opacity-50 hover:opacity-100 transition-opacity">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-sm group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: partner.color }}
                >
                  {partner.initial}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
