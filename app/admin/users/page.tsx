import { Users, ShieldCheck, Sprout, Ban } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Profile } from "@/lib/types";
import UserActions from "@/components/admin/UserActions";

export const dynamic = "force-dynamic";

export default async function AdminUsers() {
  const { supabase, profile: me } = await requireAdmin();

  const { data: profilesData } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  const profiles = (profilesData ?? []) as Profile[];

  // Emails live in auth.users — fetch via the service-role client.
  const admin = createAdminClient();
  const { data: authList } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  const emailById = new Map((authList?.users ?? []).map((u) => [u.id, u.email ?? ""]));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-poppins text-primary">Users</h1>
        <p className="text-gray-500 text-sm mt-1">{profiles.length} registered {profiles.length === 1 ? "member" : "members"}.</p>
      </div>

      {profiles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
          <Users className="w-8 h-8 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No members have signed up yet.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {profiles.map((p) => {
            const isSelf = p.id === me.id;
            const isAdmin = p.role === "admin";
            return (
              <li key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold uppercase">
                  {(p.full_name || emailById.get(p.id) || "?").charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-primary text-sm truncate">{p.full_name || "Unnamed member"}</p>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isAdmin ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                      {isAdmin ? <ShieldCheck className="w-3 h-3" /> : <Sprout className="w-3 h-3" />}
                      {p.role}
                    </span>
                    {p.suspended && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-red-500">
                        <Ban className="w-3 h-3" /> Suspended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {emailById.get(p.id) || "—"}
                    {p.region ? ` · ${p.region}` : ""}
                    {p.farming_type ? ` · ${p.farming_type}` : ""}
                  </p>
                </div>

                <div className="shrink-0">
                  <UserActions id={p.id} role={p.role} suspended={p.suspended} isSelf={isSelf} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
