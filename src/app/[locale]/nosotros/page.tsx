// src/app/nosotros/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Nosotros - Nay's Dreams",
  description:
    "Conoce más sobre Nay's Dreams y nuestra pasión por la sublimación",
};

export default async function NosotrosPage() {
  const t = await getTranslations("About");
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6 text-pink-600">{t("title")}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t("description")}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">{t("history")}</h2>
          <p className="text-gray-600 mb-4">{t("historyDescription")}</p>
          <p className="text-gray-600">{t("historyDescription2")}</p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image
            src="/imagen1.webp"
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
              src="/imagen2.webp"
              alt="Nuestro proceso de trabajo"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-2xl font-bold mb-4">{t("commitment")}</h2>
          <p className="text-gray-600 mb-4">{t("commitmentDescription")}</p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">✓</span>
              {t("commitmentDescription2")}
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">✓</span>
              {t("commitmentDescription3")}
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">✓</span>
              {t("commitmentDescription4")}
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">✓</span>
              {t("commitmentDescription5")}
            </li>
          </ul>
        </div>
      </section>

      <section className="text-center bg-pink-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-pink-600">
          {t("titleContact")}
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {t("descriptionContact")}
        </p>
        <Link
          href="/contact"
          className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
        >
          {t("contact")}
        </Link>
      </section>
    </main>
  );
}
