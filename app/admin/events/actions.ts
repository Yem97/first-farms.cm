"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

export type EventState = { error?: string };

function slugify(s: string) {
  return (
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "event"
  );
}

function readEvent(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    event_date: String(formData.get("event_date") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    region: String(formData.get("region") ?? "").trim(),
    topic: String(formData.get("topic") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    trainer: String(formData.get("trainer") ?? "").trim(),
    image_url: String(formData.get("image_url") ?? "").trim(),
    registration_open: String(formData.get("registration_open") ?? "") === "on",
    spotsRaw: String(formData.get("spots_available") ?? "").trim(),
  };
}

function toRow(f: ReturnType<typeof readEvent>) {
  let event_date: string | null = null;
  if (f.event_date) {
    const d = new Date(f.event_date);
    if (!Number.isNaN(d.getTime())) event_date = d.toISOString();
  }
  let spots_available: number | null = null;
  if (f.spotsRaw) {
    const n = parseInt(f.spotsRaw, 10);
    if (!Number.isNaN(n) && n >= 0) spots_available = n;
  }
  return {
    title: f.title,
    event_date,
    location: f.location || null,
    region: f.region || null,
    topic: f.topic || null,
    description: f.description || null,
    trainer: f.trainer || null,
    image_url: f.image_url || null,
    registration_open: f.registration_open,
    spots_available,
  };
}

function check(f: ReturnType<typeof readEvent>): string | null {
  if (!f.title) return "Title is required.";
  if (f.image_url && !/^https?:\/\//i.test(f.image_url)) {
    return "Image URL must start with http:// or https://";
  }
  return null;
}

export async function createEvent(_prev: EventState, formData: FormData): Promise<EventState> {
  const { supabase } = await requireAdmin();
  const f = readEvent(formData);
  const err = check(f);
  if (err) return { error: err };

  const { error } = await supabase.from("training_events").insert({ ...toRow(f), slug: slugify(f.title) });
  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(_prev: EventState, formData: FormData): Promise<EventState> {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing event id." };
  const f = readEvent(formData);
  const err = check(f);
  if (err) return { error: err };

  const { error } = await supabase.from("training_events").update(toRow(f)).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("training_events").delete().eq("id", id);
  revalidatePath("/admin/events");
}
