import { Metadata } from "next";

import EditProduct from "@/components/products/EditForm";
import { pb } from "@/lib/pocketbase";
import { ItemProductsList } from "@/types/Products";

export const metadata: Metadata = {
  title: "Producto - Nay's Dreams",
  description: "Descubre nuestros productos únicos y personalizados",
};
type Props = {
  params: Promise<{ productId: string }>;
};

export default async function Page ({params}: Props){
  
  const { productId } = await params;
    

   const record = await pb
      .collection<ItemProductsList>("products")
      .getOne(productId);
  
    pb.autoCancellation(false);
    return (
        <div>
         <EditProduct products={record}/>
        </div>
    )
}