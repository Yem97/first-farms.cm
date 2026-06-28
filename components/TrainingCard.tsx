"use client";

import Image from "next/image";
import { Calendar, MapPin, User, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

interface TrainingProps {
  event: {
    title: string;
    date?: string;
    location?: string;
    region?: string;
    topic?: string;
    trainer?: string;
    image?: { assetUrl?: string; asset?: { _ref?: string; _type?: string } };
    registrationOpen?: boolean;
    spotsAvailable?: number;
    slug?: { current: string };
  };
}

export default function TrainingCard({ event }: TrainingProps) {
  const eventDate = event.date ? new Date(event.date) : null;
  const formattedDate = eventDate
    ? eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Date TBD";

  // Use the directly projected URL first; fall back to urlFor if only the ref is present
  const imageSrc = event.image?.assetUrl
    ?? (event.image ? (() => { try { return urlFor(event.image as Parameters<typeof urlFor>[0]).url(); } catch { return null; } })() : null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col md:flex-row group"
      id={`training-${event.title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden bg-gray-50">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <Calendar className="w-12 h-12" />
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary px-2 py-1 bg-secondary/10 rounded-md">
            {event.topic || "Agricultural Training"}
          </span>
          {event.registrationOpen ? (
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
              Open
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">Full</span>
          )}
        </div>

        <h3 className="text-xl font-bold mb-4 font-poppins text-primary group-hover:text-secondary transition-colors">
          {event.title}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.location || "Online"} ({event.region || "Cameroon"})</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <User className="w-4 h-4 text-primary" />
            <span>Trainer: {event.trainer || "Expert Faculty"}</span>
          </div>
        </div>

        <Link 
          href="/education" 
          className="mt-auto inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all"
        >
          View Details & Register
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
