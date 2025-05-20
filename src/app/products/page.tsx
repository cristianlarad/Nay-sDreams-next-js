import ProductCard from "@/components/products/ProductCard";
import { pb } from "@/lib/pocketbase";
import { ItemProductsList } from "@/types/Products";

const ProductsPage = async () => {
  const records = await pb
    .collection("products")
    .getFullList<ItemProductsList>({
      expand: "*",
    });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 ">
      {records.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
