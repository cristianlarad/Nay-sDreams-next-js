import { Phone } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Nay's Dreams",
  description:
    "Términos y condiciones de uso de Nay's Dreams. Conoce las políticas de compra, envíos, cambios y devoluciones de nuestros productos personalizados.",
};

export default async function TerminosCondiciones() {
  const t = await getTranslations("Conditions");
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="prose prose-pink max-w-none">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          {t("title")}- Nay&apos;s Dreams
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("accept")}
            </h2>
            <p className="text-gray-700">{t("acceptText")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("useSite")}
            </h2>
            <p className="text-gray-700">{t("useSiteText")}</p>
            <p>{t("useSiteText2")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("orderBuy")}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t("orderBuyText")}</li>
              <li>{t("orderBuyText2")}</li>
              <li>{t("orderBuyText3")}</li>
              <li>{t("orderBuyText4")}</li>
              <li>{t("orderBuyText5")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("design")}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t("designText")}</li>
              <li>{t("designText2")}</li>
              <li>{t("designText3")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("shipment")}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t("shipmentText")}</li>
              <li>{t("shipmentText2")}</li>
              <li>{t("shipmentText3")}</li>
              <li>{t("shipmentText4")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("change")}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t("changeText")}</li>
              <li>{t("changeText2")}</li>
              <li>{t("changeText3")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("property")}
            </h2>
            <p className="text-gray-700">{t("propertyText")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("modify")}
            </h2>
            <p className="text-gray-700">{t("modifyText")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("contact")}
            </h2>
            <p className="text-gray-700">{t("contactText")}</p>
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
