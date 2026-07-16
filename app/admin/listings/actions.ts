"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

const VALID = ["approved", "rejected", "pending"];

export async function setListingStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !VALID.includes(status)) return;

  // Admins bypass the moderation trigger, so the status sticks as set.
  await supabase.from("products").update({ status }).eq("id", id);
  revalidatePath("/admin/listings");
  revalidatePath("/admin");
}

export async function toggleFeatured(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const current = String(formData.get("featured") ?? "") === "true";
  if (!id) return;

  await supabase.from("products").update({ featured: !current }).eq("id", id);
  revalidatePath("/admin/listings");
}

export async function adminDeleteListing(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/listings");
  revalidatePath("/admin");
}
