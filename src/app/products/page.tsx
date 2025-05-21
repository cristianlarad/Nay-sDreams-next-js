import { Suspense } from "react";

import ProductCardSkeleton from "@/components/PRoductSkeleton";
import ProductCard from "@/components/products/ProductCard";
import { pb } from "@/lib/pocketbase";
import { ItemProductsList } from "@/types/Products";

export default async function ProductsPage() {
  const records = await pb
    .collection("products")
    .getFullList<ItemProductsList>({
      expand: "*",
    });
  pb.autoCancellation(false);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
      {records.map((product) => (
        <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
          <ProductCard product={product} />
        </Suspense>
      ))}
    </div>
  );
}
