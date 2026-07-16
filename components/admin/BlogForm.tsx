"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { createPost, updatePost, type BlogState } from "@/app/admin/blog/actions";
import SubmitButton from "@/components/auth/SubmitButton";
import type { BlogPost } from "@/lib/types";

const inputClass =
  "w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors";
const labelClass = "text-sm font-bold text-gray-700 ml-1 block mb-1.5";

export default function BlogForm({ mode, post }: { mode: "create" | "edit"; post?: BlogPost }) {
  const action = mode === "create" ? createPost : updatePost;
  const [state, formAction] = useFormState<BlogState, FormData>(action, {});

  return (
    <form action={formAction} className="space-y-5">
      {mode === "edit" && post && <input type="hidden" name="id" value={post.id} />}

      {state.error && (
        <div className="flex items-start gap-2 bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label htmlFor="title" className={labelClass}>Title *</label>
        <input id="title" name="title" type="text" required defaultValue={post?.title ?? ""} className={inputClass} placeholder="Post headline" />
      </div>

      <div>
        <label htmlFor="cover_image_url" className={labelClass}>Cover Image URL</label>
        <input id="cover_image_url" name="cover_image_url" type="url" defaultValue={post?.cover_image_url ?? ""} className={inputClass} placeholder="https://…" />
      </div>

      <div>
        <label htmlFor="excerpt" className={labelClass}>Excerpt</label>
        <textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} className={inputClass} placeholder="A short summary shown in the blog list." />
      </div>

      <div>
        <label htmlFor="body" className={labelClass}>Body</label>
        <textarea id="body" name="body" rows={12} defaultValue={post?.body ?? ""} className={`${inputClass} font-mono text-sm leading-relaxed`} placeholder="Write your article here…" />
      </div>

      <label className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} className="w-5 h-5 accent-primary" />
        <span className="text-sm font-bold text-gray-700">Published (visible on the public blog)</span>
      </label>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton
          label={mode === "create" ? "Create Post" : "Save Changes"}
          pendingLabel="Saving…"
          className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-accent transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <Link href="/admin/blog" className="px-6 py-3.5 rounded-xl font-bold text-gray-600 border-2 border-gray-200 hover:border-gray-300 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}
