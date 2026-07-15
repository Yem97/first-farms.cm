import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, Package, User, MapPin, Sprout, ShieldCheck, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";
import type { Profile } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  const displayName = profile?.full_name?.trim() || user.email || "Member";
  const isAdmin = profile?.role === "admin";

  return (
    <div className="min-h-[85vh] bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold font-poppins text-primary">
                Welcome, {displayName}
              </h1>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  isAdmin ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                }`}
              >
                {isAdmin ? <ShieldCheck className="w-3 h-3" /> : <Sprout className="w-3 h-3" />}
                {isAdmin ? "Admin" : "Member"}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 px-4 py-2.5 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-lg font-bold font-poppins text-primary mb-5 flex items-center gap-2">
            <User className="w-5 h-5" />
            Your Profile
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="text-gray-400 uppercase tracking-wider text-xs font-bold mb-1">Full Name</dt>
              <dd className="text-gray-800 font-medium">{profile?.full_name || "—"}</dd>
            </div>
            <div>
              <dt className="text-gray-400 uppercase tracking-wider text-xs font-bold mb-1">Phone</dt>
              <dd className="text-gray-800 font-medium">{profile?.phone || "—"}</dd>
            </div>
            <div>
              <dt className="text-gray-400 uppercase tracking-wider text-xs font-bold mb-1">Region</dt>
              <dd className="text-gray-800 font-medium flex items-center gap-1.5">
                {profile?.region ? (
                  <>
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    {profile.region}
                  </>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-gray-400 uppercase tracking-wider text-xs font-bold mb-1">Farming Type</dt>
              <dd className="text-gray-800 font-medium">{profile?.farming_type || "—"}</dd>
            </div>
          </dl>
        </div>

        {/* My listings placeholder */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-bold font-poppins text-primary mb-5 flex items-center gap-2">
            <Package className="w-5 h-5" />
            My Listings
          </h2>
          <div className="flex flex-col items-center text-center py-10 text-gray-400">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-500">Marketplace listings are coming next.</p>
            <p className="text-xs mt-1">
              You&apos;ll be able to post produce for sale here — each listing is reviewed before going live.
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-6 bg-accent/5 border border-accent/20 rounded-2xl px-6 py-4 text-sm text-accent flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            You have admin access. The admin panel (user management + content posting) arrives in the next phase.
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
