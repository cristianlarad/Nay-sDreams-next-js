"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";

type CookiePreferences = {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Siempre activas
    preferences: false,
    analytics: false,
    marketing: false,
  });

  // Cargar preferencias guardadas
  useEffect(() => {
    const savedConsent = Cookies.get("cookieConsent");
    if (savedConsent) {
      setPreferences(JSON.parse(savedConsent));
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    Cookies.set("cookieConsent", JSON.stringify(prefs), {
      expires: 365,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Aquí puedes inicializar o deshabilitar servicios según las preferencias
    if (prefs.analytics) {
      // Inicializar Google Analytics, etc.
      console.log("Analytics habilitado");
    }

    if (prefs.marketing) {
      // Inicializar Facebook Pixel, etc.
      console.log("Marketing habilitado");
    }
  };

  const toggleCategory = (category: keyof CookiePreferences) => {
    if (category === "necessary") return; // No se puede desactivar
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto max-w-4xl">
        {!showSettings ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preferencias de Cookies</h3>
            <p className="text-sm">
              Utilizamos cookies para mejorar tu experiencia. Algunas son
              necesarias para el funcionamiento del sitio, mientras que otras
              nos ayudan a mejorar y personalizar tu experiencia. Puedes
              gestionar tus preferencias a continuación.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md text-sm font-medium"
              >
                Aceptar todas
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium"
              >
                Personalizar preferencias
              </button>

              <button
                onClick={() => {
                  savePreferences({
                    necessary: true,
                    preferences: false,
                    analytics: false,
                    marketing: false,
                  });
                  setShowBanner(false);
                }}
                className="px-4 py-2 bg-transparent hover:bg-gray-800 rounded-md text-sm font-medium"
              >
                Solo necesarias
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuración de Cookies</h3>

            <div className="space-y-3">
              <CookieCategory
                id="necessary"
                title="Cookies Necesarias"
                description="Son esenciales para que el sitio web funcione correctamente."
                checked={preferences.necessary}
                disabled
                onChange={() => {}}
              />

              <CookieCategory
                id="preferences"
                title="Preferencias"
                description="Permiten recordar tus configuraciones y preferencias."
                checked={preferences.preferences}
                onChange={() => toggleCategory("preferences")}
              />

              <CookieCategory
                id="analytics"
                title="Análisis"
                description="Nos ayudan a entender cómo interactúas con nuestro sitio."
                checked={preferences.analytics}
                onChange={() => toggleCategory("analytics")}
              />

              <CookieCategory
                id="marketing"
                title="Marketing"
                description="Se utilizan para mostrarte anuncios relevantes."
                checked={preferences.marketing}
                onChange={() => toggleCategory("marketing")}
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setShowSettings(false)}
                className="text-pink-400 hover:underline text-sm"
              >
                ← Volver
              </button>

              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md text-sm font-medium"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-400">
          <p>
            Al continuar navegando, aceptas nuestro{" "}
            <Link href="/policy" className="text-pink-400 hover:underline">
              Aviso de Privacidad
            </Link>{" "}
            y nuestros{" "}
            <Link href="/terms" className="text-pink-400 hover:underline">
              Términos de Servicio
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para cada categoría de cookies
function CookieCategory({
  id,
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg">
      <div className="flex items-center h-5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-pink-600 focus:ring-pink-500"
        />
      </div>
      <div className="flex-1 min-w-0">
        <label htmlFor={id} className="block text-sm font-medium">
          {title}
        </label>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}
