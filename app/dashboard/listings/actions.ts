"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ListingState = { error?: string };

function parseListing(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    priceRaw: String(formData.get("price") ?? "").trim(),
    unit: String(formData.get("unit") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    region: String(formData.get("region") ?? "").trim(),
    image_url: String(formData.get("image_url") ?? "").trim(),
    whatsapp_number: String(formData.get("whatsapp_number") ?? "").trim(),
  };
}

function validate(f: ReturnType<typeof parseListing>): { price: number | null } | { error: string } {
  if (!f.name) return { error: "Product name is required." };
  if (f.name.length > 120) return { error: "Product name is too long." };
  let price: number | null = null;
  if (f.priceRaw) {
    price = Number(f.priceRaw.replace(/[,\s]/g, ""));
    if (Number.isNaN(price) || price < 0) return { error: "Price must be a positive number." };
  }
  if (f.image_url && !/^https?:\/\//i.test(f.image_url)) {
    return { error: "Image URL must start with http:// or https://" };
  }
  return { price };
}

export async function createListing(_prev: ListingState, formData: FormData): Promise<ListingState> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const f = parseListing(formData);
  const v = validate(f);
  if ("error" in v) return v;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, region")
    .eq("id", user.id)
    .single();

  const { error } = await supabase.from("products").insert({
    owner_id: user.id,
    name: f.name,
    description: f.description || null,
    price: v.price,
    unit: f.unit || null,
    category: f.category || null,
    region: f.region || profile?.region || null,
    farmer_name: profile?.full_name || null,
    image_url: f.image_url || null,
    whatsapp_number: f.whatsapp_number || null,
  });
  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  redirect("/dashboard?created=1");
}

export async function updateListing(_prev: ListingState, formData: FormData): Promise<ListingState> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing listing id." };

  const f = parseListing(formData);
  const v = validate(f);
  if ("error" in v) return v;

  // .eq(owner_id) is belt-and-suspenders; RLS already enforces ownership.
  const { error } = await supabase
    .from("products")
    .update({
      name: f.name,
      description: f.description || null,
      price: v.price,
      unit: f.unit || null,
      category: f.category || null,
      region: f.region || null,
      image_url: f.image_url || null,
      whatsapp_number: f.whatsapp_number || null,
    })
    .eq("id", id)
    .eq("owner_id", user.id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  redirect("/dashboard?updated=1");
}

export async function deleteListing(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "");
  if (id) {
    await supabase.from("products").delete().eq("id", id).eq("owner_id", user.id);
    revalidatePath("/dashboard");
  }
  redirect("/dashboard?deleted=1");
}
