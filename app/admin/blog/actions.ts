"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

export type BlogState = { error?: string };

function slugify(s: string) {
  return (
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "post"
  );
}

function readPost(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    cover_image_url: String(formData.get("cover_image_url") ?? "").trim(),
    published: String(formData.get("published") ?? "") === "on",
  };
}

function check(f: ReturnType<typeof readPost>): string | null {
  if (!f.title) return "Title is required.";
  if (f.cover_image_url && !/^https?:\/\//i.test(f.cover_image_url)) {
    return "Cover image URL must start with http:// or https://";
  }
  return null;
}

export async function createPost(_prev: BlogState, formData: FormData): Promise<BlogState> {
  const { supabase, user } = await requireAdmin();
  const f = readPost(formData);
  const err = check(f);
  if (err) return { error: err };

  let slug = slugify(f.title);
  const { data: existing } = await supabase.from("blog_posts").select("id").eq("slug", slug).maybeSingle();
  if (existing) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;

  const { error } = await supabase.from("blog_posts").insert({
    author_id: user.id,
    title: f.title,
    slug,
    excerpt: f.excerpt || null,
    body: f.body || null,
    cover_image_url: f.cover_image_url || null,
    published: f.published,
    published_at: f.published ? new Date().toISOString() : null,
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updatePost(_prev: BlogState, formData: FormData): Promise<BlogState> {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing post id." };
  const f = readPost(formData);
  const err = check(f);
  if (err) return { error: err };

  const { data: current } = await supabase.from("blog_posts").select("published_at").eq("id", id).single();
  const published_at = f.published ? current?.published_at ?? new Date().toISOString() : null;

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title: f.title,
      excerpt: f.excerpt || null,
      body: f.body || null,
      cover_image_url: f.cover_image_url || null,
      published: f.published,
      published_at,
    })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function togglePublish(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const publish = String(formData.get("publish") ?? "") === "true";
  if (!id) return;

  await supabase
    .from("blog_posts")
    .update({ published: publish, published_at: publish ? new Date().toISOString() : null })
    .eq("id", id);
  revalidatePath("/admin/blog");
}

export async function deletePost(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePath("/admin/blog");
}
