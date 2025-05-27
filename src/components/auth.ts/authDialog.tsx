"use client";

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
  return (
    <Button
      type="submit"
      className="w-full bg-pink-500 hover:bg-pink-600"
      disabled={pending}
    >
      {pending ? "Procesando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
    </Button>
  );
}

export function AuthDialog() {
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
          Iniciar Sesión
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </DialogTitle>
        </DialogHeader>

        <form
          action={isLogin ? loginAction : registerAction}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <Input
                name="name"
                type="text"
                required
                disabled={state?.success}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              name="email"
              type="email"
              required
              disabled={state?.success}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
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
              {isLogin ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
