"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { AlertCircle, CheckCircle } from "lucide-react";
import { signup, type AuthState } from "@/app/auth/actions";
import SubmitButton from "@/components/auth/SubmitButton";

const regions = [
  "Adamaoua", "Centre", "Est", "Extrême-Nord", "Littoral",
  "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest",
];
const farmingTypes = [
  "Vegetables", "Cocoa / Coffee", "Livestock", "Grains & Legumes", "Fruits", "Other",
];

const inputClass =
  "w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors";
const labelClass = "text-sm font-bold text-gray-700 ml-1 block mb-1.5";

export default function SignupForm() {
  const [state, formAction] = useFormState<AuthState, FormData>(signup, {});

  if (state.success) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold font-poppins text-primary">Almost there!</h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">{state.success}</p>
        <Link href="/login" className="inline-block text-primary font-bold border-b border-primary text-sm">
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="flex items-start gap-2 bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label htmlFor="full_name" className={labelClass}>Full Name *</label>
        <input id="full_name" name="full_name" type="text" required autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email *</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="6XX XXX XXX" className={inputClass} />
        </div>
        <div>
          <label htmlFor="region" className={labelClass}>Region</label>
          <select id="region" name="region" className={`${inputClass} appearance-none`} defaultValue="">
            <option value="">Select region</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="farming_type" className={labelClass}>Type of Farming</label>
        <select id="farming_type" name="farming_type" className={`${inputClass} appearance-none`} defaultValue="">
          <option value="">Select type</option>
          {farmingTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>Password *</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClass}
        />
        <p className="text-xs text-gray-400 mt-1 ml-1">At least 8 characters.</p>
      </div>

      <SubmitButton
        label="Create Account"
        pendingLabel="Creating account…"
        className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-accent transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      />
    </form>
  );
}
