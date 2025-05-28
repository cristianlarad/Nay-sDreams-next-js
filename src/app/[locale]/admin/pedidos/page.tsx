import { Metadata } from "next";
import React from "react";

import PedidosList from "@/components/pedidos/pedidosList";
import { getPocketBase } from "@/lib/pocketbase";
import { IPedidos } from "@/types/pedidos";
export const metadata: Metadata = {
  title: `Pedidos - Nay's Dreams`,
  description: "Descubre nuestra colección de ropa y accesorios únicos",
};
const PedidosPage = async () => {
  const pb = await getPocketBase();

  const pedidos: IPedidos[] = await pb.collection("pedido").getFullList({
    sort: "-created",
    filter: "status > 1",
  });

  return (
    <div>
      <PedidosList pedidos={pedidos} />
    </div>
  );
};

export default PedidosPage;
