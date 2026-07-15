"use client";

import { useFormState } from "react-dom";
import { AlertCircle } from "lucide-react";
import { login, type AuthState } from "@/app/auth/actions";
import SubmitButton from "@/components/auth/SubmitButton";

const inputClass =
  "w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors";
const labelClass = "text-sm font-bold text-gray-700 ml-1 block mb-1.5";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction] = useFormState<AuthState, FormData>(login, {});

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirect" value={redirectTo} />

      {state.error && (
        <div className="flex items-start gap-2 bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      <SubmitButton
        label="Sign In"
        pendingLabel="Signing in…"
        className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-accent transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      />
    </form>
  );
}
