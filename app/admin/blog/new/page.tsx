import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import BlogForm from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to blog
      </Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Newspaper className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold font-poppins text-primary">New Post</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <BlogForm mode="create" />
      </div>
    </div>
  );
}
