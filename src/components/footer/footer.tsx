import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pink-50 text-black pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/naysDream.svg"
                alt="Nay's Dreams Logo"
                className="h-12 w-auto"
              />
            </div>
            <p className="">
              Transformando ideas en realidad a través de la sublimación.
              Productos únicos y personalizados con la mejor calidad.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-500">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className=" hover:text-pink-400 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className=" hover:text-pink-400 transition-colors"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className=" hover:text-pink-400 transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className=" hover:text-pink-400 transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-500">
              Contáctanos
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-pink-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="">Dirección de la tienda, Ciudad, País</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-pink-400 mr-3" />
                <a href="tel:+1234567890" className=" hover:text-pink-400">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-pink-400 mr-3" />
                <a
                  href="mailto:sabrinamador2001@gmail.com"
                  className=" hover:text-pink-400"
                >
                  sabrinamador2001@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-500">
              Horario de Atención
            </h3>
            <ul className="space-y-2 text-black">
              <li className="flex justify-between">
                <span>Lunes - Viernes:</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado:</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo:</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className=" text-sm mb-4 md:mb-0">
              &copy; {currentYear} Nay&apos;s Dreams. Todos los derechos
              reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/policy"
                className="text-black hover:text-pink-400 text-sm"
              >
                Política de Privacidad
              </Link>
              <Link href="/conditions" className=" hover:text-pink-400 text-sm">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
