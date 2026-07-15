import Link from "next/link";
import { redirect } from "next/navigation";
import { Sprout } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import SignupForm from "@/components/auth/SignupForm";

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl shadow-sm mb-4">
            <Sprout className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-poppins text-primary">Join the Cooperative</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create your account to list produce and access training
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <SignupForm />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already a member?{" "}
          <Link href="/login" className="text-primary font-bold hover:text-secondary transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
