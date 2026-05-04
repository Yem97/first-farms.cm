"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export default function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237XXXXXXXXX";
  
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 right-6 z-40"
      id="whatsapp-floating"
    >
      <Link 
        href={`https://wa.me/${phoneNumber}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group relative"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-white text-text text-xs font-bold py-2 px-3 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
          Chat with us
        </span>
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10"></span>
      </Link>
    </motion.div>
  );
}
