import { client } from "@/sanity/lib/client";
import { teamMembersQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { CheckCircle, Heart, Star, Target } from "lucide-react";

export const dynamic = 'force-dynamic';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: { asset: { _ref: string } };
  localPhoto?: string;
}

const fallbackTeam: TeamMember[] = [
  { _id: 'ft1', name: 'Amadou Nkwemo', role: 'Co-Founder & CEO', localPhoto: '/images/avatars/team-1.svg' },
  { _id: 'ft2', name: 'Amina Tchaptchet', role: 'Head of Operations', localPhoto: '/images/avatars/team-2.svg' },
  { _id: 'ft3', name: 'Jean-Paul Mbarga', role: 'Agricultural Director', localPhoto: '/images/avatars/team-3.svg' },
  { _id: 'ft4', name: 'Fatima Aboubakar', role: 'Community Liaison', localPhoto: '/images/avatars/team-4.svg' },
  { _id: 'ft5', name: 'Emmanuel Essomba', role: 'Technology Lead', localPhoto: '/images/avatars/team-5.svg' },
  { _id: 'ft6', name: 'Marie-Claire Fouda', role: 'Finance Officer', localPhoto: '/images/avatars/team-6.svg' },
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
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Our Roots &amp; Vision</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Founded with the belief that Cameroon&apos;s strength lies in its fertile soil and the hands that work it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold font-poppins text-primary">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              First Farms Cameroon started in 2018 as a small group of 5 farmers in the Littoral region who wanted to get fairer prices for their plantains. We realized that by combining our harvests, we could reach bigger markets in Douala directly.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, we have grown into a multi-regional cooperative spanning over 12 locations across Cameroon, helping hundreds of families achieve economic stability through sustainable agriculture.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <p className="text-4xl font-bold text-secondary mb-2">2018</p>
                <p className="text-sm font-bold uppercase tracking-widest text-primary">Founded</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary mb-2">12+</p>
                <p className="text-sm font-bold uppercase tracking-widest text-primary">Regions</p>
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
              &ldquo;To uplift the Cameroonian farmer by providing a transparent, efficient, and educational ecosystem that guarantees food security and prosperity for our nation.&rdquo;
            </p>
          </div>
          <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold font-poppins text-primary mb-6">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-lg italic">
              &ldquo;To become the leading model of agricultural cooperation in Sub-Saharan Africa, recognized for quality, sustainability, and communal wealth creation.&rdquo;
            </p>
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
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">Meet the Founders</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">The dedicated team working behind the scenes to support our farmers every day.</p>
            {teamMembers.length === 0 && (
              <p className="text-xs text-secondary/60 mt-2 font-medium">
                Placeholder profiles — replace with real team photos via the Sanity Studio.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {displayTeam.map((member) => {
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
