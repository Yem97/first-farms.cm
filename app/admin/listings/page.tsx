import Link from "next/link";
import Image from "next/image";
import { Package, Check, X, Star, RotateCcw } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import type { Product, ProductStatus } from "@/lib/types";
import { setListingStatus, toggleFeatured } from "./actions";
import AdminDeleteForm from "@/components/admin/AdminDeleteForm";

export const dynamic = "force-dynamic";

const filters: { key: string; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All" },
];

const statusCls: Record<ProductStatus, string> = {
  pending: "bg-amber-50 text-amber-600",
  approved: "bg-green-50 text-green-600",
  rejected: "bg-red-50 text-red-500",
};

export default async function AdminListings({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const { supabase } = await requireAdmin();
  const status = filters.some((f) => f.key === searchParams.status) ? searchParams.status! : "pending";

  let query = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (status !== "all") query = query.eq("status", status);
  const { data } = await query;
  const products = (data ?? []) as Product[];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-poppins text-primary">Listing Moderation</h1>
        <p className="text-gray-500 text-sm mt-1">Approve produce before it appears in the public marketplace.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <Link
            key={f.key}
            href={`/admin/listings?status=${f.key}`}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              status === f.key ? "bg-primary text-white" : "bg-white text-gray-500 border border-gray-200 hover:text-primary"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
          <Package className="w-8 h-8 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No {status !== "all" ? status : ""} listings.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {products.map((p) => (
            <li key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center">
                {p.image_url ? (
                  <Image src={p.image_url} alt={p.name} fill className="object-cover" unoptimized />
                ) : (
                  <Package className="w-6 h-6 text-gray-300" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-primary text-sm">{p.name}</p>
                  <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusCls[p.status]}`}>
                    {p.status}
                  </span>
                  {p.featured && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary/20 text-accent">
                      <Star className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {p.farmer_name || "Member"}{p.region ? ` · ${p.region}` : ""}
                  {p.price != null ? ` · ${p.price.toLocaleString()} FCFA` : ""}{p.unit ? ` ${p.unit}` : ""}
                  {p.category ? ` · ${p.category}` : ""}
                </p>
                {p.description && <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{p.description}</p>}
              </div>

              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                {p.status !== "approved" && (
                  <form action={setListingStatus}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="status" value="approved" />
                    <button type="submit" className="inline-flex items-center gap-1.5 text-xs font-bold bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors">
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                  </form>
                )}
                {p.status !== "rejected" && (
                  <form action={setListingStatus}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="status" value="rejected" />
                    <button type="submit" className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-red-500 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </form>
                )}
                {p.status === "rejected" && (
                  <form action={setListingStatus}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="status" value="pending" />
                    <button type="submit" className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-gray-500 border border-gray-200 px-3 py-2 rounded-lg hover:text-primary transition-colors">
                      <RotateCcw className="w-3.5 h-3.5" /> Reopen
                    </button>
                  </form>
                )}
                {p.status === "approved" && (
                  <form action={toggleFeatured}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="featured" value={String(p.featured)} />
                    <button type="submit" aria-label="Toggle featured"
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border transition-colors ${
                        p.featured ? "bg-secondary/20 text-accent border-secondary/30" : "bg-white text-gray-500 border-gray-200 hover:text-accent"
                      }`}>
                      <Star className="w-3.5 h-3.5" /> {p.featured ? "Unfeature" : "Feature"}
                    </button>
                  </form>
                )}
                <AdminDeleteForm id={p.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
