import { Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Nay's Dreams",
  description:
    "Términos y condiciones de uso de Nay's Dreams. Conoce las políticas de compra, envíos, cambios y devoluciones de nuestros productos personalizados.",
};

export default function TerminosCondiciones() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="prose prose-pink max-w-none">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          Términos y Condiciones de Uso - Nay&apos;s Dreams
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Aceptación de los términos
            </h2>
            <p className="text-gray-700">
              Al acceder y realizar pedidos en nuestro sitio web o redes
              sociales, aceptas los presentes Términos y Condiciones. Si no
              estás de acuerdo, por favor no utilices nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Uso del sitio
            </h2>
            <p className="text-gray-700">
              Este sitio web está destinado únicamente a uso personal. Queda
              prohibido el uso con fines comerciales ajenos a Nay&apos;s Dreams
              sin autorización previa. No se permite el uso de nuestros
              contenidos (imágenes, textos, diseños) sin consentimiento.
            </p>
            <p>
              No tenemos plataforma de pago, por lo que debes contactarnos para
              hacer el pago.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Pedidos y pagos
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Todos los productos se elaboran bajo pedido personalizado.
              </li>
              <li>
                Se recoge el 50% por adelantado y una vez tenga su producto
                listo se recoge el otro 50%.
              </li>
              <li>Esto para evitar que el cliente no haga un pedido falso</li>
              <li>
                Una vez hecho el primer pago el pedido se procesa y en caso q lo
                quiera cancelar pierde el 50% del pago
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Diseños personalizados
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                El cliente es responsable de revisar y aprobar los diseños antes
                de su impresión.
              </li>
              <li>
                No nos hacemos responsables por errores no corregidos en esta
                etapa.
              </li>
              <li>
                El diseño final no se puede modificar una vez enviado a
                producción.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Envíos
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Realizamos envíos a todo Lincoln mediante mensajería.</li>
              <li>
                Nuestra Empresa se responsabiliza por los retrasos o daños
                ocasionados por la mensajería.
              </li>
              <li>El cliente debe revisar su pedido al recibirlo.</li>
              <li>
                En caso de error en la dirección proporcionada, el segundo envío
                será cubierto por el cliente.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Cambios y devoluciones
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                No se aceptan cambios ni devoluciones en productos
                personalizados.
              </li>
              <li>
                Solo se repondrán productos si hubo error comprobable por parte
                de Nay&apos;s Dreams.
              </li>
              <li>
                Es obligatorio notificar dentro de las 72 horas hábiles desde la
                recepción.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Propiedad intelectual
            </h2>
            <p className="text-gray-700">
              Todo el contenido de Nay&apos;s Dreams (logos, diseños, fotos,
              productos) es propiedad intelectual de la marca. Su reproducción
              sin permiso está prohibida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Modificaciones
            </h2>
            <p className="text-gray-700">
              Nos reservamos el derecho de modificar estos términos en cualquier
              momento. Las modificaciones estarán disponibles en esta misma
              sección.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Contacto
            </h2>
            <p className="text-gray-700">
              Para consultas sobre estos términos, llame al:
            </p>
            <ul className="mt-2 space-y-1 text-gray-700">
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-pink-400 mr-2" />
                <a href="tel:+1234567890" className="hover:text-pink-600">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
