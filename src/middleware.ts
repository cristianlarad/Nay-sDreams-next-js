import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";
// Obtener IPs permitidas de las variables de entorno
const ALLOWED_IPS = process.env.ALLOWED_IPS?.split(",") || [];
const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === "true";

// IPs locales que siempre deberían tener acceso
const LOCAL_IPS = ["127.0.0.1", "::1"];

const intlMiddleware = createIntlMiddleware(routing);

function getClientIP(request: NextRequest): string | null {
  // En desarrollo, permitir siempre
  if (IS_DEVELOPMENT) {
    return "127.0.0.1";
  }

  // Obtener IP de los headers comunes
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return null;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar si la ruta comienza con /admin
  if (pathname.startsWith("/admin")) {
    const clientIP = getClientIP(request);

    // Si no se pudo determinar la IP, denegar acceso por seguridad
    if (!clientIP) {
      console.log("No se pudo determinar la IP del cliente");
      return new NextResponse("Acceso no autorizado", { status: 403 });
    }

    console.log("IP detectada:", clientIP);
    console.log("IPs permitidas:", ALLOWED_IPS);

    // Verificar si la IP está en la lista de permitidas o es localhost
    const isAllowed =
      ALLOWED_IPS.includes(clientIP) ||
      (IS_DEVELOPMENT && LOCAL_IPS.includes(clientIP));

    console.log(
      "Acceso",
      isAllowed ? "permitido" : "denegado",
      "a la IP:",
      clientIP
    );

    if (!isAllowed) {
      return new NextResponse("Acceso no autorizado", { status: 403 });
    }
  }

  // Continuar con el middleware de internacionalización
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
