"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Opcional: Registrar el error en un servicio de reporte de errores
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          ¡Ups! Algo salió mal
        </h2>
        <p className="text-gray-700 mb-6">
          Lo sentimos, ha ocurrido un error inesperado. Por favor, inténtalo de
          nuevo más tarde.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-center"
          >
            Volver al inicio
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-left">
          <p className="font-medium mb-2">Detalles del error:</p>
          <code className="block overflow-auto p-2 bg-gray-200 rounded text-xs">
            {error.message || "Error desconocido"}
          </code>
        </div>
      </div>
    </div>
  );
}
