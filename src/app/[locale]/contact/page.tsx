import { RiWhatsappFill } from "@remixicon/react";
import { Facebook, Instagram, Phone, MailQuestion } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import MapaContacto from "@/components/map/mapLeaflet";

//metadata
export const metadata: Metadata = {
  title: "Contacto - Nay's Dreams",
  description: "Contáctanos para cualquier consulta",
};

export default async function Contact() {
  const t = await getTranslations("Contact");
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">{t("title")}</span>
            <span className="block text-pink-600">{t("description")}</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t("question")}
          </p>
        </div>
        <div className="py-3">
          <MapaContacto
            lat={40.7604942321777}
            zoom={13}
            lng={-96.6814422607422}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Información de Contacto */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("contact")}
            </h2>
            <div className="space-y-6">
              <Link href="tel:+14027700227">
                <div className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-pink-500" />
                  <div>
                    <p className="text-gray-600">{t("phone")}</p>
                    <p className="text-gray-900 font-medium">+14027700227</p>
                  </div>
                </div>
              </Link>
              <Link href="mailto:sabrinamador2001@gmail.com?subject=Contacto%20desde%20la%20web&body=Hola%20Nay's%20Dreams%2C%0D%0A%0D%0A">
                <div className="flex items-start gap-3">
                  <MailQuestion className="w-6 h-6 text-pink-500" />
                  <div>
                    <p className="text-gray-600">{t("email")}</p>
                    <p className="text-gray-900 font-medium">
                      sabrinamador@gmail
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("social")}
            </h2>
            <div className="space-y-6">
              <Link
                target="_blank"
                href="https://www.facebook.com/share/1BSMv24LUt/?mibextid=wwXIfr"
              >
                <div className="flex items-center gap-4">
                  <Facebook className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-gray-600">Facebook</p>
                    <p className="text-gray-900 font-medium">@naysdreams</p>
                  </div>
                </div>
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/sabryamador2?igsh=bmtjY3Q3dTlpZzJ5&utm_source=qr"
              >
                <div className="flex items-center gap-4">
                  <Instagram className="w-8 h-8 text-pink-500" />
                  <div>
                    <p className="text-gray-600">Instagram</p>
                    <p className="text-gray-900 font-medium">@naysdreams</p>
                  </div>
                </div>
              </Link>

              <Link href="whatsapp://send?phone=+14027700227">
                <div className="flex items-center gap-4">
                  <RiWhatsappFill className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-gray-600">WhatsApp</p>
                    <p className="text-gray-900 font-medium">+14027700227</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
