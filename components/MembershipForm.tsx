"use client";

import { useState } from "react";
import { MessageCircle, CheckCircle } from "lucide-react";

const regions = [
  "Adamaoua", "Centre", "Est", "Extrême-Nord", "Littoral",
  "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest"
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  region: string;
  type: string;
}

export default function MembershipForm() {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", region: "", type: "" });
  const [submitted, setSubmitted] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237XXXXXXXXX";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*New Membership Application — First Farms Cameroon*\n\n` +
      `👤 Name: ${form.name}\n` +
      `📞 Phone: ${form.phone}\n` +
      `📧 Email: ${form.email || "Not provided"}\n` +
      `📍 Region: ${form.region}\n` +
      `🌱 Farming Type: ${form.type}`
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
        <h3 className="text-2xl font-bold font-poppins text-primary">Application Sent!</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Your membership request has been sent via WhatsApp. Our team will confirm your registration within 2 business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-primary font-bold border-b border-primary text-sm"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block">Full Name *</label>
          <input
            type="text" name="name" required value={form.name} onChange={handleChange}
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block">Phone Number *</label>
          <input
            type="tel" name="phone" required value={form.phone} onChange={handleChange}
            placeholder="e.g. 6XX XXX XXX"
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700 ml-1 block">Email Address</label>
        <input
          type="email" name="email" value={form.email} onChange={handleChange}
          className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block">Region *</label>
          <select
            name="region" required value={form.region} onChange={handleChange}
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
          >
            <option value="">Select Region</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block">Type of Farming *</label>
          <select
            name="type" required value={form.type} onChange={handleChange}
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
          >
            <option value="">Select Primary Type</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Cocoa/Coffee">Cocoa / Coffee</option>
            <option value="Livestock">Livestock</option>
            <option value="Grains">Grains & Legumes</option>
            <option value="Fruits">Fruits</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-accent transition-all active:scale-95 flex items-center justify-center gap-3"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        Submit via WhatsApp
      </button>
      <p className="text-center text-xs text-gray-400">Your application will open in WhatsApp for instant processing.</p>
    </form>
  );
}
