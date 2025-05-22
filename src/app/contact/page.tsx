import { RiWhatsappFill } from "@remixicon/react";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

import MapaContacto from "@/components/map/mapLeaflet";

export default function Contact() {
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Contáctanos</span>
            <span className="block text-pink-600">
              ¡Estamos aquí para ayudarte!
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            ¿Tienes preguntas? ¿Necesitas ayuda? No dudes en ponerte en contacto
            con nosotros.
          </p>
        </div>
        <div className="py-3">
          <MapaContacto lat={25.7825454} lng={-80.3077963} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Información de Contacto */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Información de Contacto
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Phone className="w-6 h-6 text-pink-500" />
                <div>
                  <p className="text-gray-600">Teléfono</p>
                  <p className="text-gray-900 font-medium">+1 XXX XXX XXXX</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-pink-500" />
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="text-gray-900 font-medium">
                    contacto@naysdreams.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-pink-500" />
                <div>
                  <p className="text-gray-600">Ubicación</p>
                  <p className="text-gray-900 font-medium">Santo Domingo, RD</p>
                </div>
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Síguenos
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Facebook className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-gray-600">Facebook</p>
                  <p className="text-gray-900 font-medium">@naysdreams</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Instagram className="w-8 h-8 text-pink-500" />
                <div>
                  <p className="text-gray-600">Instagram</p>
                  <p className="text-gray-900 font-medium">@naysdreams</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <RiWhatsappFill className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-gray-600">WhatsApp</p>
                  <p className="text-gray-900 font-medium">+1 XXX XXX XXXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
