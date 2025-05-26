import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/button";
import MapaContacto from "@/components/map/mapLeaflet";
import InfoPedidos from "@/components/products/InfoPedidos";
import Destacadoslist from "@/components/products/destacadoslist";
import { Skeleton } from "@/components/skeleton";
import TitleNays from "@/components/titleNays";

export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sección Hero */}
      <section className="relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid items-center justify-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-700 mb-6">
                ¡Bienvenido a
              </h1>
              <TitleNays />
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Descubre nuestra colección única de productos personalizados con
              sublimación
            </p>
            <div className="grid md:flex  justify-center gap-4">
              <Link href="/products">
                <Button className="bg-pink-700 hover:bg-pink-800 px-8 py-4 text-lg text-white">
                  Explorar Productos
                </Button>
              </Link>
            </div>
            <div className="">
              <h1 className="text-4xl  mt-4">Ubicación</h1>
              <div className="py-4">
                <MapaContacto
                  lat={40.7604942321777}
                  zoom={13}
                  lng={-96.6814422607422}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Características */}
      <section className="mt-4">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-pink-50 rounded-lg shadow-lg">
              <div className="text-4xl text-pink-900 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">
                Diseño Personalizado
              </h3>
              <p className="text-gray-600">
                Crea diseños únicos y personalizados para cada producto
              </p>
            </div>

            <div className="text-center p-6 bg-pink-50 rounded-lg shadow-lg">
              <div className="text-4xl text-pink-900 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">
                Calidad Premium
              </h3>
              <p className="text-gray-600">
                Materiales de alta calidad y acabados profesionales
              </p>
            </div>

            <div className="text-center p-6 bg-pink-50 rounded-lg shadow-lg">
              <div className="text-4xl text-pink-900 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">
                Rápida Entrega
              </h3>
              <p className="text-gray-600">
                Entrega rápida y segura a toda la región
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Destacados */}
      <Suspense fallback={<Skeleton className="h-96" />}>
        <Destacadoslist />
      </Suspense>
      <InfoPedidos />

      {/* Sección Contacto */}
    </div>
  );
}
