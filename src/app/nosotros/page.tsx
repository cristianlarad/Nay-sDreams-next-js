// src/app/nosotros/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nosotros - Nay's Dreams",
  description:
    "Conoce más sobre Nay's Dreams y nuestra pasión por la sublimación",
};

export default function NosotrosPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6 text-pink-600">
          Sobre Nosotros
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          En Nay&apos;s Dreams transformamos tus ideas en realidad a través de
          la sublimación. Somos apasionados por crear productos únicos y
          personalizados que cuenten tu historia.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
          <p className="text-gray-600 mb-4">
            Nay&apos;s Dreams nació de la pasión por la creatividad y el deseo
            de ofrecer productos personalizados de alta calidad. Lo que comenzó
            como un pequeño emprendimiento se ha convertido en un referente en
            el mundo de la sublimación.
          </p>
          <p className="text-gray-600">
            Cada pieza que creamos está hecha con dedicación y atención al
            detalle, asegurando la más alta calidad en cada producto que sale de
            nuestro taller.
          </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image
            src="/images/nosotros-1.jpg" // Reemplaza con tu imagen
            alt="Nuestro equipo de trabajo"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 md:order-1">
          <div className="relative h-80 rounded-xl overflow-hidden">
            <Image
              src="/images/nosotros-2.jpg" // Reemplaza con tu imagen
              alt="Nuestro proceso de trabajo"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-2xl font-bold mb-4">Nuestro Compromiso</h2>
          <p className="text-gray-600 mb-4">
            En Nay&apos;s Dreams nos comprometemos a ofrecer productos de la más
            alta calidad, utilizando materiales de primera y tecnología de
            vanguardia en sublimación.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">✓</span>
              Productos 100% personalizables
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">✓</span>
              Materiales de primera calidad
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">✓</span>
              Atención personalizada
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">✓</span>
              Garantía de satisfacción
            </li>
          </ul>
        </div>
      </section>

      <section className="text-center bg-pink-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-pink-600">
          ¿Listo para crear algo increíble?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Contáctanos hoy mismo y cuéntanos sobre tu proyecto. Estamos aquí para
          ayudarte a hacerlo realidad.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
        >
          Contáctanos
        </Link>
      </section>
    </main>
  );
}
