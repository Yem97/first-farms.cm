import { createClient } from "@/lib/supabase/server";
import type { TrainingEvent as DbTrainingEvent } from "@/lib/types";
import TrainingCard from "@/components/TrainingCard";
import { BookOpen, Leaf, BarChart3, Database, Smartphone, Info, CalendarDays } from "lucide-react";
import Image from "next/image";
import TrainingInterestForm from "@/components/TrainingInterestForm";

export const dynamic = 'force-dynamic';

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
  image?: { assetUrl?: string; asset?: { _ref?: string; _type?: string } };
}

// Map a Supabase training_events row to the shape TrainingCard renders.
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
    image: e.image_url ? { assetUrl: e.image_url } : undefined,
  };
}

const categories = [
  { title: "Soil Management",  desc: "Understanding soil health, pH balance, and organic fertilization.",            icon: Leaf        },
  { title: "Crop Rotation",    desc: "Maximizing yield and preventing pests through strategic planting.",             icon: BookOpen    },
  { title: "Post-Harvest",     desc: "Techniques for reducing waste and proper storage for export.",                  icon: Database    },
  { title: "Business Skills",  desc: "Financial literacy, accounting, and market analysis for small farms.",          icon: BarChart3   },
  { title: "Digital Farming",  desc: "Using smartphone apps for weather tracking and direct selling.",                icon: Smartphone  },
];

export default async function EducationPage() {
  // Workshops come from Supabase (posted via /admin/events).
  // Empty until an admin adds real events — no placeholder sessions.
  let displayEvents: TrainingEvent[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("training_events")
      .select("*")
      .order("event_date", { ascending: true, nullsFirst: false });
    displayEvents = ((data ?? []) as DbTrainingEvent[]).map(mapEventRow);
  } catch {
    // Supabase not configured — section stays empty
  }

  return (
    <div className="pt-20">

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Farmer Education Program</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Equipping Cameroonian farmers with the knowledge and tools to double their productivity through sustainable science.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 hidden md:block">
          <Image src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80" alt="Training" fill className="object-cover" />
        </div>
      </section>

      {/* ── PROGRAM OVERVIEW ────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold font-poppins text-primary">Roots of Knowledge</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Traditional farming methods in Cameroon are rich in wisdom, but facing new challenges from climate change and global competition. Our education program bridges this gap by introducing modern, climate-smart technologies that respect local traditions.
            </p>
            <div className="p-6 bg-secondary/10 rounded-2xl flex gap-4">
              <Info className="w-6 h-6 text-secondary shrink-0" />
              <p className="text-accent text-sm font-medium">
                Members of Firstfarms Digital Cooperative Society get 100% free access to all physical and digital training materials.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-8 text-center">
              {[
                { value: "5,000+", label: "Farmers Trained"  },
                { value: "24",     label: "Active Trainers"  },
                { value: "100%",   label: "Practical Focus"  },
                { value: "08",     label: "Field Stations"   },
              ].map((s, i) => (
                <div key={i}>
                  <h3 className="text-4xl font-bold text-primary font-poppins mb-2">{s.value}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAINING CATEGORIES ─────────────────────────────────── */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold font-poppins text-primary text-center mb-16">Training Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {categories.map((c, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <c.icon className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold font-poppins text-primary mb-3 leading-tight">{c.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING WORKSHOPS ──────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold font-poppins text-primary">Upcoming Workshops</h2>
        </div>
        <p className="text-center text-gray-500 mb-12">Physical and virtual sessions across Cameroon.</p>

        {displayEvents.length === 0 ? (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm py-16 px-6 text-center">
            <CalendarDays className="w-10 h-10 mx-auto mb-4 text-gray-300" />
            <p className="font-bold font-poppins text-primary">No workshops scheduled yet</p>
            <p className="text-gray-500 text-sm mt-1">Check back soon. New training sessions are added regularly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
            {displayEvents.map((event) => (
              <TrainingCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* ── PROGRAM IMPACT ──────────────────────────────────────── */}
      <section className="py-24 bg-accent text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold font-poppins mb-16">Program Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80", city: "Ebolowa"    },
              { src: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80", city: "Bafoussam"  },
              { src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=400&q=80", city: "Garoua"     },
              { src: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80", city: "Buea"       },
            ].map((item, i) => (
              <div key={i} className="relative aspect-square rounded-3xl overflow-hidden group">
                <Image
                  src={item.src}
                  alt={`Farmer Training in ${item.city}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-700 opacity-60"
                />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-xs font-bold text-left italic">Farmer Training in {item.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTER INTEREST ───────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 max-w-3xl">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold font-poppins text-primary text-center mb-10">Register Your Interest</h2>
          <TrainingInterestForm />
        </div>
      </section>

    </div>
  );
}
