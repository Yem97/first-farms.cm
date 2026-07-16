import Link from "next/link";
import { CalendarDays, Plus, Pencil, Trash2, MapPin } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import type { TrainingEvent } from "@/lib/types";
import { deleteEvent } from "./actions";
import ConfirmForm from "@/components/admin/ConfirmForm";

export const dynamic = "force-dynamic";

export default async function AdminEvents() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("training_events").select("*").order("event_date", { ascending: true });
  const events = (data ?? []) as TrainingEvent[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-poppins text-primary">Training Events</h1>
          <p className="text-gray-500 text-sm mt-1">Schedule and manage farmer training sessions.</p>
        </div>
        <Link href="/admin/events/new" className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-accent transition-colors">
          <Plus className="w-4 h-4" /> New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
          <CalendarDays className="w-8 h-8 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No events yet. Schedule your first session.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {events.map((ev) => {
            const date = ev.event_date
              ? new Date(ev.event_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              : "Date TBD";
            return (
              <li key={ev.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex flex-col items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-primary text-sm truncate">{ev.title}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${ev.registration_open ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                      {ev.registration_open ? "Open" : "Closed"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                    {date}
                    {ev.location && <><span>·</span><MapPin className="w-3 h-3" />{ev.location}{ev.region ? ` (${ev.region})` : ""}</>}
                    {ev.topic ? ` · ${ev.topic}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Link href={`/admin/events/${ev.id}/edit`} aria-label="Edit event" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <ConfirmForm action={deleteEvent} id={ev.id} message="Delete this event permanently?">
                    <button type="submit" aria-label="Delete event" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </ConfirmForm>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
