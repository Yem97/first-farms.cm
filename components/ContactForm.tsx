"use client";

import { useState } from "react";
import { MessageCircle, CheckCircle } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237XXXXXXXXX";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*Message via AgriTech Hub Website*\n\n` +
      `👤 Name: ${form.name}\n` +
      `📧 Email: ${form.email}\n` +
      `📞 Phone: ${form.phone || "Not provided"}\n` +
      `📌 Subject: ${form.subject}\n\n` +
      `💬 Message:\n${form.message}`
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
        <h3 className="text-2xl font-bold font-poppins text-primary">Message Sent!</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Your message has been delivered via WhatsApp. We will get back to you as soon as possible.
        </p>
        <button onClick={() => setSubmitted(false)} className="text-primary font-bold border-b border-primary text-sm">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700 ml-1 block text-left">Your Name *</label>
        <input
          type="text" name="name" required value={form.name} onChange={handleChange}
          className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block text-left">Email Address *</label>
          <input
            type="email" name="email" required value={form.email} onChange={handleChange}
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 ml-1 block text-left">Phone Number</label>
          <input
            type="tel" name="phone" value={form.phone} onChange={handleChange}
            className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700 ml-1 block text-left">Subject *</label>
        <select
          name="subject" required value={form.subject} onChange={handleChange}
          className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none font-medium"
        >
          <option value="">Select a Subject</option>
          <option value="Membership">Membership Inquiry</option>
          <option value="Sales">Buying Produce</option>
          <option value="Training">Training Participation</option>
          <option value="Partnership">Partnerships / Sponsorships</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700 ml-1 block text-left">Message *</label>
        <textarea
          name="message" required rows={5} value={form.message} onChange={handleChange}
          className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-accent transition-all active:scale-95 flex items-center justify-center gap-3"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        Send via WhatsApp
      </button>
      <p className="text-center text-xs text-gray-400">Your message will open in WhatsApp for instant delivery.</p>
    </form>
  );
}
