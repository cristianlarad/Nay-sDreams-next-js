// src/app/api/pedidos/[id]/route.ts
import { NextResponse } from "next/server";

import { PedidoEstado } from "@/lib/enums/enums";
import { getPocketBase } from "@/lib/pocketbase";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const pb = await getPocketBase();

    await pb.collection("pedido").update(id, {
      status: PedidoEstado.CONFIRMADO,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar el pedido" },
      { status: 500 }
    );
  }
}
