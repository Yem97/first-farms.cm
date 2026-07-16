import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LogOut, Package, User, MapPin, Sprout, ShieldCheck, Plus, Pencil,
  CheckCircle2, Clock, XCircle, PackageOpen,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";
import DeleteListingButton from "@/components/dashboard/DeleteListingButton";
import type { Profile, Product } from "@/lib/types";

export const dynamic = "force-dynamic";

const statusStyles: Record<Product["status"], { label: string; cls: string; icon: typeof Clock }> = {
  pending:  { label: "Pending review", cls: "bg-amber-50 text-amber-600",   icon: Clock },
  approved: { label: "Live",           cls: "bg-green-50 text-green-600",   icon: CheckCircle2 },
  rejected: { label: "Rejected",       cls: "bg-red-50 text-red-500",       icon: XCircle },
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { created?: string; updated?: string; deleted?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: listings }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
    supabase.from("products").select("*").eq("owner_id", user.id).order("created_at", { ascending: false }),
  ]);

  const displayName = profile?.full_name?.trim() || user.email || "Member";
  const isAdmin = profile?.role === "admin";
  const products = (listings ?? []) as Product[];

  const toast =
    searchParams.created ? "Listing submitted. It's now pending review." :
    searchParams.updated ? "Listing updated. Sent for a quick re-review." :
    searchParams.deleted ? "Listing deleted." : null;

  return (
    <div className="min-h-[85vh] bg-gray-50 pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold font-poppins text-primary">
                Welcome, {displayName}
              </h1>
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${isAdmin ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                {isAdmin ? <ShieldCheck className="w-3 h-3" /> : <Sprout className="w-3 h-3" />}
                {isAdmin ? "Admin" : "Member"}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          </div>
          <form action={logout}>
            <button type="submit" className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 px-4 py-2.5 rounded-xl transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>

        {toast && (
          <div className="mb-6 flex items-center gap-2 bg-green-50 text-green-700 text-sm rounded-xl px-4 py-3">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {toast}
          </div>
        )}

        {isAdmin && (
          <Link href="/admin" className="mb-6 flex items-center justify-between bg-accent text-white rounded-2xl px-6 py-4 hover:bg-accent/90 transition-colors group">
            <span className="flex items-center gap-2 text-sm font-bold">
              <ShieldCheck className="w-4 h-4" />
              Open the Admin Panel: manage users, listings & content
            </span>
            <span className="text-white/70 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        )}

        {/* Profile card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-lg font-bold font-poppins text-primary mb-5 flex items-center gap-2">
            <User className="w-5 h-5" />
            Your Profile
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="text-gray-400 uppercase tracking-wider text-xs font-bold mb-1">Full Name</dt>
              <dd className="text-gray-800 font-medium">{profile?.full_name || "Not set"}</dd>
            </div>
            <div>
              <dt className="text-gray-400 uppercase tracking-wider text-xs font-bold mb-1">Phone</dt>
              <dd className="text-gray-800 font-medium">{profile?.phone || "Not set"}</dd>
            </div>
            <div>
              <dt className="text-gray-400 uppercase tracking-wider text-xs font-bold mb-1">Region</dt>
              <dd className="text-gray-800 font-medium flex items-center gap-1.5">
                {profile?.region ? (<><MapPin className="w-3.5 h-3.5 text-secondary" />{profile.region}</>) : "Not set"}
              </dd>
            </div>
            <div>
              <dt className="text-gray-400 uppercase tracking-wider text-xs font-bold mb-1">Farming Type</dt>
              <dd className="text-gray-800 font-medium">{profile?.farming_type || "Not set"}</dd>
            </div>
          </dl>
        </div>

        {/* My listings */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold font-poppins text-primary flex items-center gap-2">
              <Package className="w-5 h-5" />
              My Listings
              {products.length > 0 && (
                <span className="text-xs font-bold text-gray-400">({products.length})</span>
              )}
            </h2>
            <Link href="/dashboard/listings/new" className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-accent transition-colors">
              <Plus className="w-4 h-4" />
              New Listing
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center text-center py-12 text-gray-400">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                <PackageOpen className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-gray-500">You have no listings yet.</p>
              <p className="text-xs mt-1 max-w-xs">Post your first produce listing. It goes live after a quick admin review.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {products.map((p) => {
                const s = statusStyles[p.status];
                return (
                  <li key={p.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center">
                      {p.image_url ? (
                        <Image src={p.image_url} alt={p.name} fill className="object-cover" unoptimized />
                      ) : (
                        <Package className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-primary text-sm truncate">{p.name}</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${s.cls}`}>
                          <s.icon className="w-3 h-3" />
                          {s.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {p.price != null ? `${p.price.toLocaleString()} FCFA` : "No price"}
                        {p.unit ? ` · ${p.unit}` : ""}
                        {p.category ? ` · ${p.category}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Link href={`/dashboard/listings/${p.id}/edit`} aria-label="Edit listing"
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteListingButton id={p.id} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors">← Back to site</Link>
        </div>
      </div>
    </div>
  );
}
