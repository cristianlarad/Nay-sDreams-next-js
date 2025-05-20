import { pb } from "@/lib/pocketbase";
import { ItemProductsList } from "@/types/Products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Hero03 from "@/components/hero-03/hero-03";
import { Card } from "@/components/ui/card";

type Props = {
  params: Promise<{ productId: string }>;
};
export default async function ({ params }: Props) {
  const { productId } = await params;
  const record = await pb
    .collection<ItemProductsList>("products")
    .getOne(productId);
  return (
    <>
      <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
        {record.title}
      </h1>
      <div className="flex  items-center z-0 h-auto">
        <div className="max-w-4xl mx-auto mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Galería de imágenes
          </h3>
          <Card className="relative z-0 px-3">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {record.images.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2">
                    <div className="relative group">
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
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-pink-500/20 rounded-full hover:bg-pink-500/30 transition-colors p-2" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-pink-500/20 rounded-full hover:bg-pink-500/30 transition-colors p-2" />
            </Carousel>
          </Card>
        </div>
        <Hero03
          title={record.title}
          description={record.description}
          price={record.price}
        />
      </div>
    </>
  );
}
