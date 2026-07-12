"use client";

import { useState } from "react";
import { MessageCircle, CheckCircle } from "lucide-react";

const topics = ["Soil Management", "Crop Rotation", "Post-Harvest", "Business Skills", "Digital Farming", "Other"];

interface FormState {
  name: string;
  phone: string;
  topic: string;
}

export default function TrainingInterestForm() {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", topic: "" });
  const [submitted, setSubmitted] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237XXXXXXXXX";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*Training Interest — AgriTech Hub*\n\n` +
      `👤 Name: ${form.name}\n` +
      `📞 Phone: ${form.phone}\n` +
      `📚 Topic of Interest: ${form.topic}`
    );
    window.open(`https://wa.me/${whatsapp}?text=${msg}`, "_blank");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold font-poppins text-primary">Interest Registered!</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          We have received your interest. You will be notified via WhatsApp when the next session is scheduled.
        </p>
        <button onClick={() => setSubmitted(false)} className="text-primary font-bold border-b border-primary text-sm">
          Register another interest
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block">Full Name *</label>
          <input type="text" name="name" required value={form.name} onChange={handleChange}
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block">Phone Number *</label>
          <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700 ml-1 block">Preferred Topic *</label>
        <select name="topic" required value={form.topic} onChange={handleChange}
          className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none">
          <option value="">Select Topic</option>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <button type="submit"
        className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-md hover:bg-secondary hover:text-accent transition-all active:scale-95 flex items-center justify-center gap-3">
        <MessageCircle className="w-5 h-5 fill-current" />
        Notify Me via WhatsApp
      </button>
      <p className="text-center text-xs text-gray-400">We will send session details directly to your WhatsApp.</p>
    </form>
  );
}
