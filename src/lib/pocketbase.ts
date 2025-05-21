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
