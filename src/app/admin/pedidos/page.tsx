import { Metadata } from "next";
import Link from "next/link";
import React from "react";

import { getCurrentUser } from "@/app/actions/auth";
import PedidosList from "@/components/pedidos/pedidosList";
import { getPocketBase } from "@/lib/pocketbase";
import { IPedidos } from "@/types/pedidos";
export const metadata: Metadata = {
  title: `Pedidos - Nay's Dreams`,
  description: "Descubre nuestra colección de ropa y accesorios únicos",
};
const PedidosPage = async () => {
  const user = await getCurrentUser();
  const isAdmin = user?.isAdmin === true || user?.isAdmin === "true";

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Acceso denegado
          </h1>
          <p className="mb-4">
            No tienes permisos de administrador para acceder a esta página.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

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
