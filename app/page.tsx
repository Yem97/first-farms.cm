import { client } from "@/sanity/lib/client";
import { featuredProductsQuery, testimonialsQuery, teamMembersQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { createClient } from "@/lib/supabase/server";
import type { TrainingEvent as DbTrainingEvent } from "@/lib/types";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import {
  Users, ShoppingBag, GraduationCap, ChevronRight, Quote,
  CheckCircle, ArrowRight, Leaf, MapPin, User, MessageCircle,
  Brain, Activity, Droplets, TrendingUp, Mountain, CalendarDays,
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

interface TrainingEvent {
  _id: string;
  title: string;
  date?: string;
  location?: string;
  region?: string;
  topic?: string;
  trainer?: string;
  registrationOpen?: boolean;
  spotsAvailable?: number;
  slug?: { current: string };
}

/* ── Fallback data ───────────────────────────────────────────────── */
const fallbackTestimonials: Testimonial[] = [
  {
    _id: "ft1",
    quote: "Since joining Firstfarms, I have doubled my income by selling directly to buyers in Douala. No more middlemen taking our profits.",
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
    quote: "Firstfarms gave me access to tools, storage, and markets I never thought I could reach as a small farmer in the North.",
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
  { _id: "tm1", name: "TOGUÉ TOGUÉ Laurent Ghislain", role: "President of the Board of Directors",         localPhoto: "/images/avatars/team-1.svg" },
  { _id: "tm2", name: "Tita Pascline Wokongwo",        role: "Asst. Secretary / Financial Secretary",       localPhoto: "/images/avatars/team-2.svg" },
  { _id: "tm3", name: "Siani Tomaha André",             role: "Member, Board of Directors",                  localPhoto: "/images/avatars/team-3.svg" },
  { _id: "tm4", name: "Walter Ngwa Shu",                role: "Chairperson / Asst. Treasurer, Supervisory",  localPhoto: "/images/avatars/team-4.svg" },
  { _id: "tm5", name: "Senge Grace Ebong",              role: "Secretary / Communication, Supervisory",      localPhoto: "/images/avatars/team-5.svg" },
  { _id: "tm6", name: "Ndip Prestile Anne",             role: "Member, Supervisory Board",                   localPhoto: "/images/avatars/team-6.svg" },
];

// Map a Supabase training_events row to the shape the cards render.
function mapEventRow(e: DbTrainingEvent): TrainingEvent {
  return {
    _id: e.id,
    title: e.title,
    date: e.event_date ?? undefined,
    location: e.location ?? undefined,
    region: e.region ?? undefined,
    topic: e.topic ?? undefined,
    trainer: e.trainer ?? undefined,
    registrationOpen: e.registration_open,
    spotsAvailable: e.spots_available ?? undefined,
    slug: e.slug ? { current: e.slug } : undefined,
  };
}

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
  let featuredProducts: Product[]     = [];
  let testimonials: Testimonial[]     = [];
  let teamMembers: TeamMember[]       = [];

  try {
    [featuredProducts, testimonials, teamMembers] = await Promise.all([
      client.fetch(featuredProductsQuery),
      client.fetch(testimonialsQuery),
      client.fetch(teamMembersQuery),
    ]);
  } catch {
    // Sanity not configured — fallback content used
  }

  // Upcoming workshops come from Supabase (posted via /admin/events).
  // Empty until an admin adds real events — no placeholder sessions.
  let displayEvents: TrainingEvent[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("training_events")
      .select("*")
      .order("event_date", { ascending: true, nullsFirst: false })
      .limit(3);
    displayEvents = ((data ?? []) as DbTrainingEvent[]).map(mapEventRow);
  } catch {
    // Supabase not configured — section stays empty
  }

  const displayProducts     = featuredProducts.length    > 0 ? featuredProducts    : fallbackProducts;
  const displayTestimonials = testimonials.length         > 0 ? testimonials         : fallbackTestimonials;
  const displayTeam         = teamMembers.length          > 0 ? teamMembers          : fallbackTeam;
  const waNumber            = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "237XXXXXXXXX";

  return (
    <div className="bg-background">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── ABOUT SNIPPET ─────────────────────────────────────────── */}
      <section className="pt-16 pb-20 mx-auto px-6 max-w-[1200px]">
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
                &ldquo;Intelligence meets Agriculture.&rdquo;
              </p>
            </div>
            {/* Green accent badge */}
            <div className="absolute -top-4 -left-4 bg-primary text-white px-4 py-2 rounded-xl shadow-lg hidden md:flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">AgriExpert AI</span>
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="inline-block text-primary font-bold uppercase tracking-widest text-xs px-3 py-1.5 bg-primary/10 rounded-full">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary leading-tight">
              AI-Powered Diagnosis for Every Agro-Ecosystem
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Firstfarms Digital Cooperative harnesses Artificial Intelligence, through our flagship
              platform AgriExpert AI, to deliver integrated diagnosis across agricultural and natural
              systems, empowering farmers, wildlife managers, and agribusiness operators.
            </p>
            <ul className="space-y-3">
              {[
                "AI-powered plant disease identification and treatment",
                "Animal pathology detection across livestock and wildlife",
                "Water quality analysis for fisheries and aquaculture",
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

      {/* ── AGRIEXPERT AI CAPABILITIES ────────────────────────────── */}
      <section className="py-20 bg-primary text-white">
        <div className="mx-auto px-6 max-w-[1200px]">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs px-3 py-1.5 bg-secondary/20 rounded-full mb-4">
              <Brain className="w-3.5 h-3.5" />
              Flagship Platform
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-3">AgriExpert AI</h2>
            <p className="text-secondary font-semibold text-sm uppercase tracking-[0.18em] mb-5">
              Intelligent Agro-Ecosystem Diagnosis
            </p>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              An intelligent tool that combines Artificial Intelligence with field data to provide an
              integrated diagnosis of agricultural and natural systems, guiding treatment decisions
              and sustainable management in a holistic Agro ecosystem approach.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {[
              { icon: Leaf,       title: "Plant Diseases",          desc: "Identify and diagnose crop diseases with AI-powered image analysis and treatment guidance." },
              { icon: Activity,   title: "Animal Pathologies",      desc: "Detect health conditions in livestock and wildlife with precision diagnostic tools." },
              { icon: Droplets,   title: "Water Quality",           desc: "Analyse water parameters for fisheries and aquaculture operations in real time." },
              { icon: TrendingUp, title: "Livestock Optimization",  desc: "Data-driven performance insights for livestock industries and farm management." },
              { icon: Mountain,   title: "Forest & Wildlife",       desc: "Monitor forest ecosystems and wildlife health to guide sustainable land management." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                <div className="w-11 h-11 bg-secondary/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-bold text-white font-poppins text-sm mb-2">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/services" className="inline-flex items-center gap-2 bg-secondary text-accent font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-secondary/90 transition-all">
              Learn More About AgriExpert AI
              <ArrowRight className="w-4 h-4" />
            </a>
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

      {/* ── UPCOMING EVENTS ───────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto px-6 max-w-[1200px]">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-secondary font-bold uppercase tracking-widest text-xs block mb-2">
                Grow Your Skills
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary">
                Upcoming Workshops
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                {displayEvents.length > 0
                  ? `${displayEvents.length} session${displayEvents.length > 1 ? "s" : ""} coming up. Register your spot today.`
                  : "New workshops will be announced here soon."}
              </p>
            </div>
            <Link
              href="/education"
              className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white px-6 py-3 rounded-xl font-bold transition-all text-sm"
            >
              Full Program <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {displayEvents.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-16 px-6 text-center">
              <CalendarDays className="w-10 h-10 mx-auto mb-4 text-gray-300" />
              <p className="font-bold font-poppins text-primary">No workshops scheduled yet</p>
              <p className="text-gray-500 text-sm mt-1">Check back soon. New training sessions are added regularly.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayEvents.map((event) => {
              const eventDate = event.date ? new Date(event.date) : null;
              const day       = eventDate?.toLocaleDateString("en-US", { day: "2-digit" }) ?? "--";
              const monthYear = eventDate
                ? eventDate.toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase()
                : "DATE TBD";
              const waMsg = encodeURIComponent(`Hello Firstfarms! I would like to register for: ${event.title}`);
              const isOpen = event.registrationOpen !== false;

              return (
                <div key={event._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
                  {/* Date + topic header */}
                  <div className="bg-primary px-6 pt-5 pb-5 flex items-start justify-between">
                    <div>
                      <span className="text-5xl font-black text-white font-poppins leading-none block">{day}</span>
                      <span className="text-secondary text-[11px] font-bold uppercase tracking-widest">{monthYear}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {event.topic && (
                        <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {event.topic}
                        </span>
                      )}
                      <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${isOpen ? "text-green-300" : "text-red-300"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                        {isOpen ? "Open" : "Full"}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-5 flex-1 flex flex-col gap-4">
                    <h3 className="font-bold font-poppins text-primary text-base leading-snug">{event.title}</h3>
                    <div className="space-y-2">
                      {(event.location || event.region) && (
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span>{[event.location, event.region].filter(Boolean).join(", ")}</span>
                        </div>
                      )}
                      {event.trainer && (
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <User className="w-4 h-4 text-primary shrink-0" />
                          <span>{event.trainer}</span>
                        </div>
                      )}
                      {event.spotsAvailable != null && (
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                          <span className={isOpen ? "text-green-600" : "text-red-500"}>
                            {event.spotsAvailable} spots available
                          </span>
                        </div>
                      )}
                    </div>
                    <a
                      href={`https://wa.me/${waNumber}?text=${waMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-auto flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-xl transition-all ${
                        isOpen
                          ? "bg-primary/10 hover:bg-primary text-primary hover:text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {isOpen ? "Register via WhatsApp" : "Registration Closed"}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────── */}
      <section className="py-20 mx-auto px-6 max-w-[1200px]">
        <div className="text-center mb-14">
          <span className="inline-block text-secondary font-bold uppercase tracking-widest text-xs px-3 py-1.5 bg-secondary/10 rounded-full mb-4">
            Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary">
            Board &amp; Supervisory
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Board of Directors and Supervisory Board of Firstfarms Digital Cooperative Society.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                Ready to Harness AgriExpert AI?
              </h2>
              <p className="text-gray-300 text-lg">
                Join Firstfarms Digital Cooperative Society and access AI-powered farm diagnosis, training programs, and market connections.
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
