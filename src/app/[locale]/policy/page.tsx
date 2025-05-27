import { RiWhatsappFill } from "@remixicon/react";
import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Política de Privacidad | Nay's Dreams",
  description:
    "Política de privacidad y términos de uso de Nay's Dreams. Conoce cómo protegemos tu información personal y nuestras políticas de compra.",
};

export default async function PoliticaPrivacidad() {
  const t = await getTranslations("Policy");
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="prose prose-pink max-w-none">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">{t("title")}</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("info")}
            </h2>
            <p className="text-gray-700">{t("infoText")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("user")}
            </h2>
            <p className="text-gray-700">
              {t("userText")}
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
              {t("policyBuy")}
            </h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-800">
                {t("policyBuyText")}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>{t("policyBuyText2")}</li>
                <li>{t("policyBuyText3")}</li>
                <li>{t("policyBuyText4")}</li>
                <li>{t("policyBuyText5")}</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("change")}
            </h2>
            <p className="text-gray-700">{t("changeText")}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
