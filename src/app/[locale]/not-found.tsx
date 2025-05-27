import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl w-full text-center p-8 rounded-xl bg-white shadow-lg">
        <div className="mb-8">
          <div className="text-9xl font-bold text-pink-600">404</div>
          <h1 className="text-4xl font-bold text-gray-800 mt-4">
            ¡Ups! Página no encontrada
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/"
            className="inline-block w-full sm:w-auto px-8 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors duration-200 transform hover:scale-105"
          >
            Volver al Inicio
          </Link>

          <Link
            href="/products"
            className="inline-block w-full sm:w-auto px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Ver Productos
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500">¿Necesitas ayuda?</p>
          <Link
            href="/contact"
            className="text-pink-600 hover:text-pink-800 font-medium hover:underline"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </div>
  );
}
