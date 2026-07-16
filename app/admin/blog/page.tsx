import Link from "next/link";
import { Newspaper, Plus, Pencil, Eye, EyeOff, Trash2 } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import type { BlogPost } from "@/lib/types";
import { togglePublish, deletePost } from "./actions";
import ConfirmForm from "@/components/admin/ConfirmForm";

export const dynamic = "force-dynamic";

export default async function AdminBlog() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
  const posts = (data ?? []) as BlogPost[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-poppins text-primary">Blog</h1>
          <p className="text-gray-500 text-sm mt-1">Write and publish news & educational articles.</p>
        </div>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-accent transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
          <Newspaper className="w-8 h-8 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No posts yet. Write your first article.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-primary text-sm truncate">{post.title}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${post.published ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                {post.excerpt && <p className="text-xs text-gray-400 mt-1 line-clamp-1">{post.excerpt}</p>}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="publish" value={String(!post.published)} />
                  <button type="submit" className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-primary transition-colors">
                    {post.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <Link href={`/admin/blog/${post.id}/edit`} aria-label="Edit post" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors">
                  <Pencil className="w-4 h-4" />
                </Link>
                <ConfirmForm action={deletePost} id={post.id} message="Delete this post permanently?">
                  <button type="submit" aria-label="Delete post" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </ConfirmForm>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
