import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import LoginForm from "@/components/auth.ts/loginForm";
import { pb } from "@/lib/pocketbase";

export default async function LoginPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ redirect?: string; id?: string }>;
}) {
  const t = await getTranslations("Auth");

  const searchParams = await searchParamsPromise;

  const redirectTo = searchParams?.redirect
    ? decodeURIComponent(searchParams.redirect)
    : "/";

  if (pb.authStore.isValid) {
    redirect(redirectTo);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("login")}
          </h2>
        </div>
        <LoginForm redirectTo={redirectTo} id={searchParams?.id} />
      </div>
    </div>
  );
}
