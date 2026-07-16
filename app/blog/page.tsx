import Link from "next/link";
import Image from "next/image";
import { Newspaper, ArrowRight, CalendarDays } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog & News | Firstfarms Digital Cooperative",
  description: "News, updates, and educational articles from Firstfarms Digital Cooperative.",
};

async function getPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    return (data ?? []) as BlogPost[];
  } catch {
    return [];
  }
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs px-3 py-1.5 bg-secondary/20 rounded-full mb-5">
            <Newspaper className="w-3.5 h-3.5" />
            Blog &amp; News
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">Latest from the Cooperative</h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            News, updates, and educational articles for our farming community.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 container mx-auto px-6">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Newspaper className="w-10 h-10 mx-auto mb-4 text-gray-300" />
            <p className="font-medium text-gray-500">No articles published yet.</p>
            <p className="text-sm mt-1">Check back soon for news and updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1160px] mx-auto">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden">
                  {post.cover_image_url ? (
                    <Image src={post.cover_image_url} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                      <Newspaper className="w-10 h-10" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  {post.published_at && (
                    <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5 mb-3">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {formatDate(post.published_at)}
                    </p>
                  )}
                  <h2 className="font-bold font-poppins text-primary text-lg leading-snug mb-2 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-grow">{post.excerpt}</p>}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-primary text-sm font-bold group-hover:gap-2.5 transition-all">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
