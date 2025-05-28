// En la página que usa AddPedido
import AddPedido from "@/components/pedidos/addPedidoList";
import { pb } from "@/lib/pocketbase";
import { ItemProductsList } from "@/types/Products";

export default async function AddPedidoPage() {
  const records = await pb
    .collection("products")
    .getList<ItemProductsList>(1, 50);

  return <AddPedido products={records.items} />;
}
