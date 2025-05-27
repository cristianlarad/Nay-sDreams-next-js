import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("Footer");
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
            <p className="">{t("description")}</p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-500">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className=" hover:text-pink-400 transition-colors"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className=" hover:text-pink-400 transition-colors"
                >
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className=" hover:text-pink-400 transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className=" hover:text-pink-400 transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-500">
              {t("contactUs")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-pink-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="">
                  2830 Jameson North apto 27 Lincoln NE zip code: 68516
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-pink-400 mr-3" />
                <a href="tel:+14027700227" className=" hover:text-pink-400">
                  +1 (402) 770-0227
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
              {t("openingHours")}
            </h3>
            <ul className="space-y-2 text-black">{t("openingHours24")}</ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className=" text-sm mb-4 md:mb-0">
              &copy; {currentYear} Nay&apos;s Dreams. {t("copyright")}
            </p>
            <div className="flex space-x-6">
              <Link
                href="/policy"
                className="text-black hover:text-pink-400 text-sm"
              >
                {t("policy")}
              </Link>
              <Link href="/conditions" className=" hover:text-pink-400 text-sm">
                {t("termsAndConditions")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
