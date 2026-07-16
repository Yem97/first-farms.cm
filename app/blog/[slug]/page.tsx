import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    return (data as BlogPost) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Article not found | Firstfarms Digital Cooperative" };
  return {
    title: `${post.title} | Firstfarms Digital Cooperative`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";

  return (
    <div className="pt-20">
      <article className="container mx-auto px-6 py-16 max-w-[720px]">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> All articles
        </Link>

        {date && (
          <p className="text-xs text-secondary font-bold uppercase tracking-widest flex items-center gap-1.5 mb-4">
            <CalendarDays className="w-3.5 h-3.5" />
            {date}
          </p>
        )}

        <h1 className="text-3xl md:text-5xl font-bold font-poppins text-primary leading-tight mb-6">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-gray-500 leading-relaxed mb-8 border-l-4 border-secondary pl-4">
            {post.excerpt}
          </p>
        )}

        {post.cover_image_url && (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-10 bg-gray-50 shadow-md">
            <Image src={post.cover_image_url} alt={post.title} fill className="object-cover" unoptimized />
          </div>
        )}

        {post.body && (
          <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {post.body}
          </div>
        )}
      </article>
    </div>
  );
}
