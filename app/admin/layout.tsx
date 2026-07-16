import { requireAdmin } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Guard the entire /admin subtree.
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <AdminNav />
      <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
    </div>
  );
}
