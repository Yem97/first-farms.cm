import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import BlogForm from "@/components/admin/BlogForm";
import type { BlogPost } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const { supabase } = await requireAdmin();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", params.id).single<BlogPost>();
  if (!post) redirect("/admin/blog");

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to blog
      </Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Pencil className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold font-poppins text-primary">Edit Post</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <BlogForm mode="edit" post={post} />
      </div>
    </div>
  );
}
