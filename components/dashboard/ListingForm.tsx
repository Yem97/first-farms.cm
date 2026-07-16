"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { createListing, updateListing, type ListingState } from "@/app/dashboard/listings/actions";
import SubmitButton from "@/components/auth/SubmitButton";
import type { Product } from "@/lib/types";

const categories = ["Vegetables", "Fruits", "Grains & Legumes", "Livestock", "Fish & Seafood", "Processed", "Other"];
const regions = [
  "Adamaoua", "Centre", "Est", "Extrême-Nord", "Littoral",
  "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest",
];

const inputClass =
  "w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors";
const labelClass = "text-sm font-bold text-gray-700 ml-1 block mb-1.5";

export default function ListingForm({ mode, listing }: { mode: "create" | "edit"; listing?: Product }) {
  const action = mode === "create" ? createListing : updateListing;
  const [state, formAction] = useFormState<ListingState, FormData>(action, {});

  return (
    <form action={formAction} className="space-y-5">
      {mode === "edit" && listing && <input type="hidden" name="id" value={listing.id} />}

      {state.error && (
        <div className="flex items-start gap-2 bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label htmlFor="name" className={labelClass}>Product Name *</label>
        <input id="name" name="name" type="text" required maxLength={120}
          defaultValue={listing?.name ?? ""} className={inputClass} placeholder="e.g. Fresh Plantains" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className={labelClass}>Category</label>
          <select id="category" name="category" defaultValue={listing?.category ?? ""} className={`${inputClass} appearance-none`}>
            <option value="">Select category</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="region" className={labelClass}>Region</label>
          <select id="region" name="region" defaultValue={listing?.region ?? ""} className={`${inputClass} appearance-none`}>
            <option value="">Select region</option>
            {regions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className={labelClass}>Price (FCFA)</label>
          <input id="price" name="price" type="text" inputMode="numeric"
            defaultValue={listing?.price != null ? String(listing.price) : ""} className={inputClass} placeholder="e.g. 5000" />
        </div>
        <div>
          <label htmlFor="unit" className={labelClass}>Unit</label>
          <input id="unit" name="unit" type="text" defaultValue={listing?.unit ?? ""} className={inputClass} placeholder="e.g. per bunch / per 25kg" />
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea id="description" name="description" rows={4} defaultValue={listing?.description ?? ""}
          className={inputClass} placeholder="Describe your produce, quantity available, quality…" />
      </div>

      <div>
        <label htmlFor="image_url" className={labelClass}>Image URL</label>
        <input id="image_url" name="image_url" type="url" defaultValue={listing?.image_url ?? ""}
          className={inputClass} placeholder="https://… (paste a photo link)" />
        <p className="text-xs text-gray-400 mt-1 ml-1">Paste a link to a photo of your produce. Direct photo upload is coming soon.</p>
      </div>

      <div>
        <label htmlFor="whatsapp_number" className={labelClass}>WhatsApp Number</label>
        <input id="whatsapp_number" name="whatsapp_number" type="tel" defaultValue={listing?.whatsapp_number ?? ""}
          className={inputClass} placeholder="Buyers contact you here (optional)" />
      </div>

      <div className="bg-secondary/10 text-accent text-xs rounded-xl px-4 py-3 leading-relaxed">
        Every listing is reviewed by an administrator before it appears in the public marketplace.
        Editing an approved listing sends it back for a quick re-review.
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton
          label={mode === "create" ? "Submit Listing" : "Save Changes"}
          pendingLabel="Saving…"
          className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-accent transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <Link href="/dashboard" className="px-6 py-3.5 rounded-xl font-bold text-gray-600 border-2 border-gray-200 hover:border-gray-300 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}
