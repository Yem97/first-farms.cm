"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { createEvent, updateEvent, type EventState } from "@/app/admin/events/actions";
import SubmitButton from "@/components/auth/SubmitButton";
import type { TrainingEvent } from "@/lib/types";

const regions = [
  "Adamaoua", "Centre", "Est", "Extrême-Nord", "Littoral",
  "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest",
];

const inputClass =
  "w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors";
const labelClass = "text-sm font-bold text-gray-700 ml-1 block mb-1.5";

export default function EventForm({ mode, event }: { mode: "create" | "edit"; event?: TrainingEvent }) {
  const action = mode === "create" ? createEvent : updateEvent;
  const [state, formAction] = useFormState<EventState, FormData>(action, {});
  const dateValue = event?.event_date ? event.event_date.slice(0, 16) : "";

  return (
    <form action={formAction} className="space-y-5">
      {mode === "edit" && event && <input type="hidden" name="id" value={event.id} />}

      {state.error && (
        <div className="flex items-start gap-2 bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label htmlFor="title" className={labelClass}>Title *</label>
        <input id="title" name="title" type="text" required defaultValue={event?.title ?? ""} className={inputClass} placeholder="e.g. Soil Health Workshop" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="event_date" className={labelClass}>Date & Time</label>
          <input id="event_date" name="event_date" type="datetime-local" defaultValue={dateValue} className={inputClass} />
        </div>
        <div>
          <label htmlFor="topic" className={labelClass}>Topic</label>
          <input id="topic" name="topic" type="text" defaultValue={event?.topic ?? ""} className={inputClass} placeholder="e.g. Post-Harvest" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="location" className={labelClass}>Location</label>
          <input id="location" name="location" type="text" defaultValue={event?.location ?? ""} className={inputClass} placeholder="e.g. Bamenda" />
        </div>
        <div>
          <label htmlFor="region" className={labelClass}>Region</label>
          <select id="region" name="region" defaultValue={event?.region ?? ""} className={`${inputClass} appearance-none`}>
            <option value="">Select region</option>
            {regions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="trainer" className={labelClass}>Trainer</label>
          <input id="trainer" name="trainer" type="text" defaultValue={event?.trainer ?? ""} className={inputClass} placeholder="e.g. Dr. Emmanuel Bih" />
        </div>
        <div>
          <label htmlFor="spots_available" className={labelClass}>Spots Available</label>
          <input id="spots_available" name="spots_available" type="number" min={0} defaultValue={event?.spots_available ?? ""} className={inputClass} placeholder="e.g. 40" />
        </div>
      </div>

      <div>
        <label htmlFor="image_url" className={labelClass}>Image URL</label>
        <input id="image_url" name="image_url" type="url" defaultValue={event?.image_url ?? ""} className={inputClass} placeholder="https://…" />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea id="description" name="description" rows={4} defaultValue={event?.description ?? ""} className={inputClass} placeholder="What the session covers…" />
      </div>

      <label className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer">
        <input type="checkbox" name="registration_open" defaultChecked={event?.registration_open ?? true} className="w-5 h-5 accent-primary" />
        <span className="text-sm font-bold text-gray-700">Registration open</span>
      </label>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton
          label={mode === "create" ? "Create Event" : "Save Changes"}
          pendingLabel="Saving…"
          className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-accent transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <Link href="/admin/events" className="px-6 py-3.5 rounded-xl font-bold text-gray-600 border-2 border-gray-200 hover:border-gray-300 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}
