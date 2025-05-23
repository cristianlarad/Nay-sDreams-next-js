"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted the terms
    const hasAccepted = localStorage.getItem("cookieConsentAccepted");
    if (!hasAccepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsentAccepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm md:text-base">
          Utilizamos cookies para mejorar tu experiencia. Al continuar
          navegando, aceptas nuestros{" "}
          <Link
            href="/conditions"
            className="text-pink-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Términos y Condiciones
          </Link>{" "}
          y nuestra{" "}
          <Link
            href="/policy"
            className="text-pink-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Privacidad
          </Link>
          .
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
