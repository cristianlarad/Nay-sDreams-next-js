// src/app/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getPocketBase } from "@/lib/pocketbase";

export interface AuthResponse {
  success: boolean;
  error: string | null;
}

export async function login(formData: FormData): Promise<AuthResponse> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const pb = await getPocketBase();
    await pb.collection("users").authWithPassword(email, password);

    // Guardar la cookie de autenticación
    const authCookie = pb.authStore.exportToCookie({ httpOnly: true });
    (await cookies()).set("pb_auth", authCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return { success: true, error: null };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, error: "Credenciales inválidas" };
  }
}

export async function register(formData: FormData): Promise<AuthResponse> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("Datos de registro:", { name, email, password }); // Depuración

    const pb = await getPocketBase();

    // Validar que la contraseña tenga al menos 8 caracteres
    if (password.length < 8) {
      return {
        success: false,
        error: "La contraseña debe tener al menos 8 caracteres",
      };
    }

    // Validar formato de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: "Por favor ingresa un email válido" };
    }

    // Crear usuario
    const record = await pb
      .collection("users")
      .create({
        name,
        email,
        password,
        passwordConfirm: password,
        emailVisibility: true,
      })
      .catch((error) => {
        console.error(
          "Error al crear usuario:",
          error.response?.data || error.message
        );
        throw error;
      });

    console.log("Usuario creado:", record); // Depuración

    // Iniciar sesión automáticamente
    const loginFormData = new FormData();
    loginFormData.append("email", email);
    loginFormData.append("password", password);
    return await login(loginFormData);
    //eslint-disable-next-line
  } catch (error: any) {
    console.error("Registration failed:", error);

    // Manejar errores específicos de PocketBase
    if (error?.response?.data) {
      const data = error.response.data;
      if (data.data?.email) {
        return {
          success: false,
          error: data.data.email.message || "El email ya está en uso",
        };
      }
      if (data.message) {
        return { success: false, error: data.message };
      }
    }

    return {
      success: false,
      error: "Error al registrar el usuario. Por favor, verifica tus datos.",
    };
  }
}

export async function logout() {
  const pb = await getPocketBase();
  pb.authStore.clear();
  (await cookies()).delete("pb_auth");
  redirect("/");
}

export async function getCurrentUser() {
  const pb = await getPocketBase((await cookies()).get("pb_auth")?.value);

  try {
    // Refrescar la autenticación
    if (pb.authStore.isValid) {
      await pb.collection("users").authRefresh();
      return pb.authStore.model;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}
