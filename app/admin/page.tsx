import Link from "next/link";
import { Package, Users, Newspaper, CalendarDays, Clock, ArrowRight } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const { supabase, profile } = await requireAdmin();

  const [pending, totalListings, members, posts, events, pendingList] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("training_events").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*").eq("status", "pending").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Pending review", value: pending.count ?? 0, icon: Clock, href: "/admin/listings", accent: "text-amber-600 bg-amber-50" },
    { label: "Total listings", value: totalListings.count ?? 0, icon: Package, href: "/admin/listings", accent: "text-primary bg-primary/10" },
    { label: "Members", value: members.count ?? 0, icon: Users, href: "/admin/users", accent: "text-blue-600 bg-blue-50" },
    { label: "Blog posts", value: posts.count ?? 0, icon: Newspaper, href: "/admin/blog", accent: "text-accent bg-accent/10" },
    { label: "Events", value: events.count ?? 0, icon: CalendarDays, href: "/admin/events", accent: "text-green-600 bg-green-50" },
  ];

  const pendingProducts = (pendingList.data ?? []) as Product[];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-poppins text-primary">Admin Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Signed in as {profile.full_name || "Administrator"}.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.accent}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold font-poppins text-primary tabular-nums">{s.value}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold font-poppins text-primary flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Listings awaiting review
          </h2>
          <Link href="/admin/listings" className="text-sm text-primary font-bold hover:text-secondary transition-colors inline-flex items-center gap-1">
            Moderate all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {pendingProducts.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">Nothing pending. The queue is clear. 🎉</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {pendingProducts.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="font-bold text-primary text-sm truncate">{p.name}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {p.farmer_name || "Member"}{p.region ? ` · ${p.region}` : ""}
                    {p.price != null ? ` · ${p.price.toLocaleString()} FCFA` : ""}
                  </p>
                </div>
                <Link href="/admin/listings" className="text-xs font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg transition-colors shrink-0">
                  Review
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
