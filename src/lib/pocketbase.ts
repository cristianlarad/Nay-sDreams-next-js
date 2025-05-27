import { cookies } from "next/headers";
import PocketBase from "pocketbase";

export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
export async function getPocketBase(cookieHeader?: string | null) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

  // Cargar la cookie de autenticación si existe
  if (cookieHeader) {
    pb.authStore.loadFromCookie(cookieHeader);
  }

  return pb;
}
export async function pbForRequest() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
  const cookieStore = await cookies();
  const cookie = cookieStore.get("pb_auth");

  if (cookie?.value) {
    pb.authStore.loadFromCookie(cookie.value);
  }

  return pb;
}

// Para componentes del cliente
export function getPbClient() {
  return pb;
}
