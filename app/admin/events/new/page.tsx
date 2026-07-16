import Link from "next/link";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import EventForm from "@/components/admin/EventForm";

export const dynamic = "force-dynamic";

export default async function NewEventPage() {
  await requireAdmin();

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/events" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to events
      </Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <CalendarPlus className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold font-poppins text-primary">New Event</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <EventForm mode="create" />
      </div>
    </div>
  );
}
