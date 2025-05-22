import Link from "next/link";

import { Button } from "@/components/button";
import MapaContacto from "@/components/map/mapLeaflet";
import InfoPedidos from "@/components/products/InfoPedidos";
import Destacadoslist from "@/components/products/destacadoslist";
import { Title } from "@/components/ui/Title";

export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sección Hero */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-700 mb-6">
                ¡Bienvenido a
              </h1>
              <Title text="Nay's Dreams" />
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Descubre nuestra colección única de productos personalizados con
              sublimación
            </p>
            <h1>Ubicación</h1>
            <div className="py-4">
              <MapaContacto
                lat={40.7604942321777}
                zoom={13}
                lng={-96.6814422607422}
              />
            </div>
            <div className="grid md:flex  justify-center gap-4">
              <Link href="/products">
                <Button className="bg-pink-700 hover:bg-pink-800 px-8 py-4 text-lg text-white">
                  Explorar Productos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Características */}
      <section className="py-20">
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
      <Destacadoslist />
      <InfoPedidos />

      {/* Sección Contacto */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">
              ¡Contáctanos!
            </h2>
            <p className="text-gray-600 mb-8">
              ¿Tienes alguna pregunta? No dudes en contactarnos
            </p>
            <div className="flex justify-center gap-6">
              <Button className="bg-pink-700 hover:bg-pink-800 px-6 py-3 text-white">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                WhatsApp
              </Button>
              <Button
                variant="outline"
                className="border-pink-700 text-pink-700 hover:bg-pink-50 px-6 py-3"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
