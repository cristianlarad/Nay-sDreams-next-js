import { RiWhatsappFill } from "@remixicon/react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | Nay's Dreams",
  description:
    "Política de privacidad y términos de uso de Nay's Dreams. Conoce cómo protegemos tu información personal y nuestras políticas de compra.",
};

export default function PoliticaPrivacidad() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="prose prose-pink max-w-none">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          Política de Privacidad
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Información General
            </h2>
            <p className="text-gray-700">
              En Nay&apos;s Dreams nos comprometemos a proteger la privacidad de
              nuestros clientes. Esta política describe cómo recopilamos, usamos
              y protegemos tu información personal, así como las condiciones de
              uso de nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Derechos del usuario
            </h2>
            <p className="text-gray-700">
              Tienes derecho a acceder, corregir o solicitar la eliminación de
              tu información personal en cualquier momento. Escríbenos a{" "}
              <Link href="whatsapp://send?phone=+14027700227">
                <div className="flex items-center gap-4">
                  <RiWhatsappFill className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-gray-600">WhatsApp</p>
                    <p className="text-gray-900 font-medium">+14027700227</p>
                  </div>
                </div>
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Políticas de compra, cambios y devoluciones
            </h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-800">
                Políticas de Compra y Devoluciones:
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Todos nuestros productos son personalizados, por lo que no se
                  aceptan devoluciones salvo error por parte de nuestra Empresa.
                </li>
                <li>
                  Si tu pedido llegó dañado o incorrecto, contáctanos dentro de
                  los 3 días hábiles desde la recepción con evidencia
                  fotográfica.
                </li>
                <li>
                  No nos hacemos responsables por errores en los datos
                  proporcionados por el cliente (como nombres mal escritos).
                </li>
                <li>
                  Una vez aprobado el diseño final, no se aceptan
                  modificaciones.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Cambios en la política
            </h2>
            <p className="text-gray-700">
              Nos reservamos el derecho de actualizar nuestras políticas.
              Cualquier cambio será notificado en esta misma sección.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
