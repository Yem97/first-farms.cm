import { client } from "@/sanity/lib/client";
import { teamMembersQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import {
  CheckCircle, Heart, Star, Target,
  Leaf, Beef, Fish, Egg, Trees,
  Users, TrendingUp, Briefcase, Building2, ArrowUpRight,
} from "lucide-react";

const focusAreas = [
  { title: "Agricultural",        desc: "Crop production, soil health, and climate-smart farming.",        icon: Leaf  },
  { title: "Livestock",           desc: "Herd management, animal health, and productivity.",               icon: Beef  },
  { title: "Fisheries & Aquaculture", desc: "Water quality, fish farming, and sustainable yields.",         icon: Fish  },
  { title: "Animal Industries",   desc: "Poultry and value-chain processing for farmers.",                 icon: Egg   },
  { title: "Forestry & Wildlife", desc: "Ecosystem monitoring and biodiversity protection.",               icon: Trees },
];

const ffdPillars = [
  { title: "Human Capital Efficiency",   icon: Users      },
  { title: "Commercial Efficiency",      icon: TrendingUp },
  { title: "Human Resources Efficiency", icon: Briefcase  },
  { title: "Organizational Efficiency",  icon: Building2  },
];

export const dynamic = 'force-dynamic';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: { asset: { _ref: string; _type: string } };
  localPhoto?: string;
}

const fallbackTeam: TeamMember[] = [
  { _id: 'ft1', name: 'TOGUÉ TOGUÉ Laurent Ghislain', role: 'President of the Board of Directors',          localPhoto: '/images/avatars/team-1.svg' },
  { _id: 'ft2', name: 'Tita Pascline Wokongwo',        role: 'Asst. Secretary / Financial Secretary',        localPhoto: '/images/avatars/team-2.svg' },
  { _id: 'ft3', name: 'Siani Tomaha André',             role: 'Member — Board of Directors',                  localPhoto: '/images/avatars/team-3.svg' },
  { _id: 'ft4', name: 'Walter Ngwa Shu',                role: 'Chairperson / Asst. Treasurer — Supervisory',  localPhoto: '/images/avatars/team-4.svg' },
  { _id: 'ft5', name: 'Senge Grace Ebong',              role: 'Secretary / Communication — Supervisory',      localPhoto: '/images/avatars/team-5.svg' },
  { _id: 'ft6', name: 'Ndip Prestile Anne',             role: 'Member — Supervisory Board',                   localPhoto: '/images/avatars/team-6.svg' },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80", alt: "Farmers at work" },
  { src: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80", alt: "Farm workers" },
  { src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=80", alt: "Farmland" },
  { src: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&w=400&q=80", alt: "Golden fields" },
  { src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=400&q=80", alt: "Training session" },
  { src: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80", alt: "Cameroonian farmers" },
];

export default async function AboutPage() {
  let teamMembers: TeamMember[] = [];
  try {
    teamMembers = await client.fetch(teamMembersQuery);
  } catch {
    // Sanity not yet configured — fallback team used below
  }

  const displayTeam = teamMembers.length > 0 ? teamMembers : fallbackTeam;

  const values = [
    { title: "Integrity", desc: "Honesty in every deal, from soil to scale.", icon: CheckCircle },
    { title: "Innovation", desc: "Modern techniques meeting traditional wisdom.", icon: Target },
    { title: "Community", desc: "Walking together so we can walk far.", icon: Heart },
    { title: "Excellence", desc: "Only the finest Cameroonian harvests.", icon: Star },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-primary text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Our Story &amp; Vision</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Combining Artificial Intelligence with field expertise to build the most comprehensive agro-ecosystem diagnostic platform in Cameroon.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold font-poppins text-primary">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Firstfarms Digital Cooperative is a youth- and women-led digital agricultural cooperative operating across the North West and other regions of Cameroon. It was founded on a simple conviction: that Artificial Intelligence can fundamentally transform how African farmers diagnose, manage, and optimize their agro-ecosystems.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Operating as the AgriTech &amp; Wildlife Incubation Hub for Digital Innovation, our flagship platform — AgriExpert AI — delivers integrated diagnosis across plant diseases, animal pathologies, water quality, livestock industries, and forest ecosystems in one unified solution.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <p className="text-4xl font-bold text-secondary mb-2">10+</p>
                <p className="text-sm font-bold uppercase tracking-widest text-primary">Regions</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary mb-2">5</p>
                <p className="text-sm font-bold uppercase tracking-widest text-primary">AI Modules</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg transform translate-y-8">
                <Image src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Farming" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
                <Image src="https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Farm workers" fill className="object-cover" />
              </div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
                <Image src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Farmland" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold font-poppins text-primary mb-6">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed text-lg italic">
              &ldquo;To empower every farmer, wildlife manager, and agribusiness operator with AI-powered tools for precise diagnosis, sustainable management, and data-driven decision making across entire agro-ecosystems.&rdquo;
            </p>
          </div>
          <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold font-poppins text-primary mb-6">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-lg italic">
              &ldquo;To become the leading Agro-Ecosystem AI platform in Sub-Saharan Africa — recognized for diagnostic accuracy, sustainability, and its role in building food security and environmental resilience.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-bold uppercase tracking-widest text-xs px-3 py-1.5 bg-secondary/10 rounded-full mb-4">
            What We Cover
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary">Our Focus Areas</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            A holistic agro-ecosystem approach spanning five interconnected sectors.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {focusAreas.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold font-poppins text-primary text-sm mb-2">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FFD-2031 strategic plan */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs px-3 py-1.5 bg-secondary/20 rounded-full mb-5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              2026 – 2031
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">FFD-2031</h2>
            <p className="text-gray-300 leading-relaxed">
              In line with its transformation journey, Firstfarms Digital Cooperative is launching
              <strong className="text-white"> FFD-2031</strong> — its new five-year plan focused on efficiency.
              Far more than a strategic plan, it expresses an ambition: to build a more agile, more demanding,
              and fully committed organization, serving its goal of creating an African agricultural
              cooperative for the world.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ffdPillars.map((p, i) => (
              <div
                key={p.title}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-white/30 font-bold font-poppins text-2xl">0{i + 1}</span>
                </div>
                <h3 className="font-bold font-poppins text-white text-sm leading-snug">{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary">What We Stand For</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <v.icon className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold font-poppins text-primary mb-3">{v.title}</h4>
              <p className="text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-accent text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">Our Leadership</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Board of Directors and Supervisory Board of Firstfarms Digital Cooperative Society.
            </p>
          </div>

          {/* Board of Directors */}
          <div className="mb-16">
            <p className="text-center text-xs font-bold uppercase tracking-[0.28em] text-secondary mb-10">
              Board of Directors
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {displayTeam.slice(0, 3).map((member) => {
                const photoSrc = member.localPhoto
                  ? member.localPhoto
                  : member.photo
                  ? urlFor(member.photo).url()
                  : null;
                return (
                  <div key={member._id} className="text-center group">
                    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500">
                      {photoSrc ? (
                        <Image src={photoSrc} alt={member.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <Sprout className="w-12 h-12 text-gray-700" />
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-bold font-poppins">{member.name}</h4>
                    <p className="text-secondary text-xs font-bold uppercase tracking-widest mt-1">{member.role}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Supervisory Board */}
          <div>
            <p className="text-center text-xs font-bold uppercase tracking-[0.28em] text-secondary mb-10">
              Supervisory Board
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {displayTeam.slice(3).map((member) => {
                const photoSrc = member.localPhoto
                  ? member.localPhoto
                  : member.photo
                  ? urlFor(member.photo).url()
                  : null;
                return (
                  <div key={member._id} className="text-center group">
                    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500">
                      {photoSrc ? (
                        <Image src={photoSrc} alt={member.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <Sprout className="w-12 h-12 text-gray-700" />
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-bold font-poppins">{member.name}</h4>
                    <p className="text-secondary text-xs font-bold uppercase tracking-widest mt-1">{member.role}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-bold font-poppins text-primary text-center mb-16">Moments From Our Farms</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 h-[400px]">
          {galleryImages.map((img, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Sprout({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 22 4-4-3-3" />
      <path d="m9 8 5.5-5.5a.5.5 0 0 1 .7 0l2.3 2.3a.5.5 0 0 1 0 .7L12 11" />
      <path d="M16 18c0-3.3-2.7-6-6-6s-6 2.7-6 6v4h12v-4Z" />
    </svg>
  );
}
