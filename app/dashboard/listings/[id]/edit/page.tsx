import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ListingForm from "@/components/dashboard/ListingForm";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // RLS ensures a member can only read their own listing here.
  const { data: listing } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .eq("owner_id", user.id)
    .single<Product>();

  if (!listing) redirect("/dashboard");

  return (
    <div className="min-h-[85vh] bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Pencil className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-poppins text-primary">Edit Listing</h1>
            <p className="text-gray-500 text-sm">Update your produce details.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <ListingForm mode="edit" listing={listing} />
        </div>
      </div>
    </div>
  );
}
