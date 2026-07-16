"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function setUserRole(formData: FormData) {
  const { profile } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const role = String(formData.get("role") ?? "");
  if (!id || !["admin", "member"].includes(role)) return;
  if (id === profile.id) return; // never change your own role

  const admin = createAdminClient();
  await admin.from("profiles").update({ role }).eq("id", id);
  revalidatePath("/admin/users");
}

export async function setUserSuspended(formData: FormData) {
  const { profile } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const suspend = String(formData.get("suspend") ?? "") === "true";
  if (!id || id === profile.id) return; // never suspend yourself

  const admin = createAdminClient();
  await admin.from("profiles").update({ suspended: suspend }).eq("id", id);
  // Enforce at the auth layer: a banned user cannot sign in.
  await admin.auth.admin.updateUserById(id, { ban_duration: suspend ? "876000h" : "none" });
  revalidatePath("/admin/users");
}

export async function deleteUser(formData: FormData) {
  const { profile } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id || id === profile.id) return; // never delete yourself

  const admin = createAdminClient();
  // Cascades to the profile + the user's products (FK on delete cascade).
  await admin.auth.admin.deleteUser(id);
  revalidatePath("/admin/users");
}
