import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Obtener la IP del cliente de los headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const forwarded = request.headers.get("forwarded");

    // Extraer la IP de los headers
    let ip = "unknown";

    if (forwardedFor) {
      // Tomar la primera IP si hay múltiples (x-forwarded-for: client, proxy1, proxy2)
      ip = forwardedFor.split(",")[0].trim();
    } else if (realIp) {
      ip = realIp.trim();
    } else if (forwarded) {
      // Extraer IP del header 'forwarded'
      const matches = forwarded.match(/for="?([^;,\s]+)/);
      if (matches) {
        ip = matches[1].trim();
      }
    } else if (process.env.NODE_ENV === "development") {
      // En desarrollo, usar localhost
      ip = "127.0.0.1";
    }

    // Si es una IP local, podrías obtener la IP pública aquí si es necesario
    const isLocal = ip === "::1" || ip === "127.0.0.1";

    return NextResponse.json({
      ip,
      isLocal,
      // Información adicional para depuración
      headers: {
        "x-forwarded-for": forwardedFor,
        "x-real-ip": realIp,
        forwarded: forwarded,
      },
    });
  } catch (error) {
    console.error("Error al obtener la IP:", error);
    return NextResponse.json(
      { error: "No se pudo obtener la IP", details: String(error) },
      { status: 500 }
    );
  }
}

// Evitar que Next.js cachee esta ruta
export const dynamic = "force-dynamic";
