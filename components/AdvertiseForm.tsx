"use client";

import { useState } from "react";
import { MessageCircle, CheckCircle } from "lucide-react";

interface FormState {
  name: string;
  business: string;
  email: string;
  phone: string;
  pkg: string;
  message: string;
}

interface AdvertiseFormProps {
  packages?: { name: string }[];
}

export default function AdvertiseForm({ packages = [] }: AdvertiseFormProps) {
  const [form, setForm] = useState<FormState>({ name: "", business: "", email: "", phone: "", pkg: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237XXXXXXXXX";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*Advertisement Inquiry — Firstfarms Digital Cooperative*\n\n` +
      `👤 Contact: ${form.name}\n` +
      `🏢 Business: ${form.business}\n` +
      `📧 Email: ${form.email}\n` +
      `📞 Phone: ${form.phone}\n` +
      `📦 Package: ${form.pkg}\n\n` +
      `💬 Message:\n${form.message || "No additional message."}`
    );
    window.open(`https://wa.me/${whatsapp}?text=${msg}`, "_blank");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold font-poppins text-primary">Inquiry Sent!</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Your advertising inquiry has been sent. Our team will reach out within 24 hours.
        </p>
        <button onClick={() => setSubmitted(false)} className="text-primary font-bold border-b border-primary text-sm">
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block text-left">Contact Name *</label>
          <input type="text" name="name" required value={form.name} onChange={handleChange}
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block text-left">Business Name *</label>
          <input type="text" name="business" required value={form.business} onChange={handleChange}
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block text-left">Email Address *</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange}
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block text-left">Phone Number *</label>
          <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
        </div>
      </div>
      <div className="space-y-1.5 text-left">
        <label className="text-sm font-bold text-gray-700 ml-1 block">Interested Package *</label>
        <select name="pkg" required value={form.pkg} onChange={handleChange}
          className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none font-medium">
          <option value="">Select Package</option>
          {packages.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
          <option value="Custom">Custom Quote / Other</option>
        </select>
      </div>
      <div className="space-y-1.5 text-left">
        <label className="text-sm font-bold text-gray-700 ml-1 block">Your Message</label>
        <textarea name="message" rows={4} value={form.message} onChange={handleChange}
          className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
      </div>
      <button type="submit"
        className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-accent transition-all active:scale-95 flex items-center justify-center gap-3">
        <MessageCircle className="w-5 h-5 fill-current" />
        Send Inquiry via WhatsApp
      </button>
      <p className="text-center text-xs text-gray-400">Your inquiry will open in WhatsApp for instant delivery.</p>
    </form>
  );
}
