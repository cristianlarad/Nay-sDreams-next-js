"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { AuthResponse, login } from "@/app/[locale]/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("Auth");

  return (
    <button
      type="submit"
      className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md disabled:opacity-50"
      disabled={pending}
    >
      {pending ? t("processing") : t("login")}
    </button>
  );
}

export default function LoginForm({
  redirectTo,
  id,
}: {
  redirectTo?: string;
  id?: string;
}) {
  const t = useTranslations("Auth");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [loginState, loginAction] = useActionState(
    async (state: AuthResponse, formData: FormData) => {
      const result = await login(formData);
      if (result.success) {
        const targetUrl = id
          ? `/confirm/${id}`
          : redirectTo
          ? decodeURIComponent(redirectTo)
          : "/";
        router.push(targetUrl);
      }
      return result;
    },
    { success: false, error: null }
  );

  // Manejar errores
  useEffect(() => {
    if (loginState?.error) {
      setError(loginState.error);
    }
  }, [loginState]);

  return (
    <div className="w-full max-w-md space-y-6">
      <form action={loginAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("email")}</label>
          <input
            name="email"
            type="email"
            required
            disabled={loginState?.success}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t("password")}
          </label>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            disabled={loginState?.success}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <SubmitButton />
      </form>
    </div>
  );
}
