"use client";

import { useEffect, useState } from "react";

interface CookiePreferences {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
  });

  // Cargar preferencias guardadas
  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window !== "undefined") {
      // Obtener las cookies de PocketBase
      const pbCookies = document.cookie.split(";").reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split("=");
        cookies[name] = value;
        return cookies;
      }, {} as Record<string, string>);

      const savedConsent = pbCookies["cookieConsent"];

      if (savedConsent) {
        try {
          setPreferences(JSON.parse(decodeURIComponent(savedConsent)));
        } catch (e) {
          console.error("Error al analizar las preferencias de cookies:", e);
          setShowBanner(true);
        }
      } else {
        setShowBanner(true);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    // Guardar preferencias en las cookies de PocketBase
    const cookieValue = encodeURIComponent(JSON.stringify(prefs));
    document.cookie = `cookieConsent=${cookieValue}; path=/; max-age=31536000; SameSite=Lax`;
  };

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

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-gray-200 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              Configuración de cookies
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Utilizamos cookies para mejorar tu experiencia. Puedes
              personalizar tus preferencias a continuación.
            </p>

            <div className="mt-3 space-y-2">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`cookie-${key}`}
                    checked={value}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        [key]: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                    disabled={key === "necessary"}
                  />
                  <label
                    htmlFor={`cookie-${key}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)} Cookies
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors text-sm font-medium"
            >
              Guardar preferencias
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
