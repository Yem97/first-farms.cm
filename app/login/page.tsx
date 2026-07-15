import Link from "next/link";
import { redirect } from "next/navigation";
import { Sprout } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "@/components/auth/LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  const redirectTo =
    searchParams.redirect && searchParams.redirect.startsWith("/")
      ? searchParams.redirect
      : "/dashboard";

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect(redirectTo);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl shadow-sm mb-4">
            <Sprout className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-poppins text-primary">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your AgriTech Hub account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <LoginForm redirectTo={redirectTo} />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          New to AgriTech Hub?{" "}
          <Link href="/signup" className="text-primary font-bold hover:text-secondary transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
