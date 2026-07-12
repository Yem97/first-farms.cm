"use client";

import Image from "next/image";
import { MessageCircle, MapPin, User, Tag } from "lucide-react";
import { motion } from "motion/react";
import { urlFor } from "@/sanity/lib/image";

interface ProductProps {
  product: {
    name: string;
    price: string;
    farmerName?: string;
    region?: string;
    category?: string;
    image?: { asset: { _ref: string; _type: string } } | null;
    localImage?: string;
    whatsappNumber?: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  const globalWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237XXXXXXXXX";
  const contactNumber = product.whatsappNumber || globalWhatsapp;
  const message = encodeURIComponent(`Hello, I'm interested in ${product.name} listed on AgriTech Hub marketplace.`);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col h-full group"
      id={`product-${product.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {(product.localImage || product.image) ? (
          <Image
            src={product.localImage ?? urlFor(product.image!).url()}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <Tag className="w-12 h-12" />
          </div>
        )}
        
        {product.category && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
            {product.category}
          </div>
        )}

        <div className="absolute bottom-3 right-3 bg-secondary text-accent font-bold text-sm px-3 py-1.5 rounded-lg shadow-md">
          {product.price}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-3 font-poppins text-primary leading-tight line-clamp-1">
          {product.name}
        </h3>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <User className="w-3.5 h-3.5 text-secondary" />
            <span>{product.farmerName || "Cooperative Farmer"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <MapPin className="w-3.5 h-3.5 text-secondary" />
            <span>{product.region || "Cameroon"}</span>
          </div>
        </div>

        <a 
          href={`https://wa.me/${contactNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all hover:bg-primary/90 active:scale-95 shadow-sm hover:shadow-md"
          id={`order-${product.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          Order via WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
