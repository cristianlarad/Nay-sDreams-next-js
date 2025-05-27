"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { AuthResponse, login, register } from "@/app/[locale]/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "../input";

function SubmitButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus();
  const t = useTranslations("Auth");
  return (
    <Button
      type="submit"
      className="w-full bg-pink-500 hover:bg-pink-600"
      disabled={pending}
    >
      {pending ? t("processing") : isLogin ? t("login") : t("register")}
    </Button>
  );
}

export function AuthDialog() {
  const t = useTranslations("Auth");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [loginState, loginAction] = useActionState(
    async (state: AuthResponse, formData: FormData) => {
      return await login(formData);
    },
    {
      success: false,
      error: null,
    }
  );

  const [registerState, registerAction] = useActionState(
    async (state: AuthResponse, formData: FormData) => {
      return await register(formData);
    },
    {
      success: false,
      error: null,
    }
  );

  // Manejar errores
  const state = isLogin ? loginState : registerState;
  if (state?.error && state.error !== error) {
    setError(state.error);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white">
          {t("signIn")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isLogin ? t("login") : t("register")}</DialogTitle>
        </DialogHeader>

        <form
          action={isLogin ? loginAction : registerAction}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("name")}
              </label>
              <Input
                name="name"
                type="text"
                required
                disabled={state?.success}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("email")}
            </label>
            <Input
              name="email"
              type="email"
              required
              disabled={state?.success}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("password")}
            </label>
            <Input
              name="password"
              type="password"
              required
              minLength={8}
              disabled={state?.success}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <SubmitButton isLogin={isLogin} />

          <p className="text-center text-sm">
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-pink-500 hover:underline"
              disabled={state?.success}
            >
              {isLogin ? t("signUp") : t("signIn")}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
