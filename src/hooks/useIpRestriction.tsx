"use client";

import { useEffect, useState } from "react";

// Obtener IPs permitidas de las variables de entorno
const ALLOWED_IPS = process.env.NEXT_PUBLIC_ALLOWED_IPS?.split(",") || [];
const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === "true";

// IPs locales que siempre tienen acceso
const LOCAL_IPS = ["127.0.0.1", "::1"];

const isDevelopment = (): boolean => {
  // Verificar si estamos en el navegador
  if (typeof window !== "undefined") {
    // En el navegador, podemos verificar la URL
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      IS_DEVELOPMENT
    );
  }
  // En el servidor, usar la variable de entorno
  return IS_DEVELOPMENT;
};

export function useIpRestriction() {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkIp = async () => {
      try {
        // En desarrollo, permitir siempre
        if (isDevelopment()) {
          console.log("Modo desarrollo: acceso permitido");
          setIsAllowed(true);
          setIsLoading(false);
          return;
        }

        // Llamada a la API para obtener la IP del cliente
        const response = await fetch("/api/check-ip");

        if (!response.ok) {
          throw new Error("Error al verificar la IP");
        }

        const { ip } = await response.json();

        // Verificar si la IP está permitida
        const allowed =
          ALLOWED_IPS.includes(ip) ||
          (isDevelopment() && LOCAL_IPS.includes(ip));

        console.log("Verificación de IP:", {
          ip,
          allowed,
          allowedIps: ALLOWED_IPS,
          isDev: isDevelopment(),
        });

        setIsAllowed(allowed);
      } catch (err) {
        console.error("Error al verificar IP:", err);
        setError("No se pudo verificar el acceso");
        setIsAllowed(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkIp();
  }, []);

  return { isAllowed, isLoading, error };
}

// Componente para envolver contenido restringido por IP
export function IpRestricted({ children }: { children: React.ReactNode }) {
  const { isAllowed, isLoading, error } = useIpRestriction();

  if (isLoading) {
    return null; // O un componente de carga
  }

  if (error) {
    console.error(error);
    return null;
  }

  return isAllowed ? <>{children}</> : null;
}
