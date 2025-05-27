import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { getCurrentUser } from "@/app/[locale]/actions/auth";
import { AuthDialog } from "@/components/auth.ts/authDialog";
import Hero03 from "@/components/hero-03/hero-03";
import Pedidos from "@/components/products/Pedidos";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { pb } from "@/lib/pocketbase";
import { ItemProductsList } from "@/types/Products";

//metadata
export const metadata: Metadata = {
  title: "Producto - Nay's Dreams",
  description: "Descubre nuestros productos únicos y personalizados",
};
type Props = {
  params: Promise<{ productId: string }>;
};

export default async function Page({ params }: Props) {
  const t = await getTranslations("Products");
  const locale = await getLocale();
  const getLocalizedTitle = (product: ItemProductsList) => {
    return locale === "en" && product.titleEn ? product.titleEn : product.title;
  };
  const getLocalizedDescription = (product: ItemProductsList) => {
    return locale === "en" && product.descriptionEn
      ? product.descriptionEn
      : product.description;
  };
  const { productId } = await params;
  const user = await getCurrentUser();
  const record = await pb
    .collection<ItemProductsList>("products")
    .getOne(productId);

  pb.autoCancellation(false);
  return (
    <>
      <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
        {getLocalizedTitle(record)}
      </h1>
      <div className="grid lg:flex  items-center z-0 h-auto">
        <div className="max-w-4xl mx-auto mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            {t("galery")}
          </h3>
          <Card className="relative z-0 px-3">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {record.images.map((image, index) => (
                  <CarouselItem key={index} className="lg:basis-1/2">
                    <div className="relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://nays-dream.pockethost.io/api/files/${record.collectionId}/${record.id}/${image}`}
                        alt={record.title}
                        className="w-full h-[400px] z-0 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-sm">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-pink-500/55 rounded-full hover:bg-pink-500/30 transition-colors p-2" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-pink-500/55 rounded-full hover:bg-pink-500/30 transition-colors p-2" />
            </Carousel>
          </Card>
        </div>
        <Hero03
          title={getLocalizedTitle(record)}
          description={getLocalizedDescription(record)}
          price={record.price}
        />
      </div>
      {user ? (
        <Pedidos
          titleEn={record.titleEn}
          userEmail={user.email}
          username={user.name}
          imagesUrl={record.images ?? []}
          price={record.price ?? 0}
          title={getLocalizedTitle(record) ?? ""}
          id={record.id ?? ""}
          collectionId={record.collectionId ?? ""}
        />
      ) : (
        <div className="flex flex-col items-center justify-center mt-4">
          <h1 className="text-2xl font-bold mb-4">{t("singInText")}</h1>
          <AuthDialog />
        </div>
      )}
    </>
  );
}
