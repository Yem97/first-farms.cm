import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, PackagePlus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ListingForm from "@/components/dashboard/ListingForm";

export const dynamic = "force-dynamic";

export default async function NewListingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-[85vh] bg-gray-50 pt-28 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <PackagePlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-poppins text-primary">New Listing</h1>
            <p className="text-gray-500 text-sm">List your produce for buyers across Cameroon.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <ListingForm mode="create" />
        </div>
      </div>
    </div>
  );
}
