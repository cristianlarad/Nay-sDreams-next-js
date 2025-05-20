import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/PRoductSkeleton";
import { pb } from "@/lib/pocketbase";
import { ItemProductsList } from "@/types/Products";
import { Suspense } from "react";

const ProductsPage = async () => {
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
};

export default ProductsPage;
