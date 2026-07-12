"use client";

import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin, Sprout, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-white" id="site-footer">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col leading-[1.2]">
                <span className="text-xl font-bold font-poppins tracking-tight">
                  AgriTech <span className="text-secondary">Hub</span>
                </span>
                <span className="text-[10px] text-gray-400 tracking-wide">
                  AgriTech &amp; Wildlife Incubation Hub
                </span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Combining Artificial Intelligence with field data to diagnose, monitor, and optimize agricultural and natural systems across Cameroon and beyond.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-poppins text-secondary">Quick Links</h3>
            <ul className="space-y-4 text-gray-300">
              <li><Link href="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Our Story</Link></li>
              <li><Link href="/membership" className="hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Become a Member</Link></li>
              <li><Link href="/education" className="hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Training Programs</Link></li>
              <li><Link href="/marketplace" className="hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Farmer's Market</Link></li>
              <li><Link href="/services" className="hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Our Services</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-poppins text-secondary">Get In Touch</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm">Main Office, Douala, Littoral Region, Cameroon</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm">+237 6XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm">hello@firstfarms.cm</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / WhatsApp */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-poppins text-secondary">Stay Connected</h3>
            <p className="text-sm text-gray-300 mb-6">Get the latest news, market prices, and training alerts directly on WhatsApp.</p>
            <NewsletterWidget />
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-xs">
          <p>© {currentYear} AgriTech &amp; Wildlife Incubation Hub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function NewsletterWidget() {
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237XXXXXXXXX";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(`Hello AgriTech Hub! I'd like to subscribe to your WhatsApp updates. My number is ${phone}.`);
    window.open(`https://wa.me/${whatsapp}?text=${msg}`, "_blank");
    setDone(true);
  }

  if (done) {
    return (
      <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center space-y-2">
        <p className="text-secondary font-bold text-sm">You are subscribed!</p>
        <p className="text-gray-400 text-xs">You will receive updates directly on WhatsApp.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="tel"
        placeholder="Your WhatsApp number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary transition-colors placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2.5 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        Subscribe via WhatsApp
      </button>
    </form>
  );
}
