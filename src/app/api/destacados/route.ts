import { NextResponse } from "next/server";

import { getPocketBase } from "@/lib/pocketbase";

export async function GET() {
  try {
    const pb = await getPocketBase();

    const pedidos = await pb.collection("pedido").getFullList();

    const productCounts = new Map();

    pedidos.forEach((pedido) => {
      if (pedido.productTitle) {
        const productKey = pedido.productTitle.toLowerCase().trim();
        const existing = productCounts.get(productKey) || {
          count: 0,
          productTitle: pedido.productTitle,
          imageUrl: pedido.imageUrl,
          id: pedido.id,
          productId: pedido.productId,
        };

        productCounts.set(productKey, {
          ...existing,
          count: existing.count + 1,
        });
      }
    });

    const topProducts = Array.from(productCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return NextResponse.json({
      success: true,
      data: topProducts,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Error fetching destacados,${error}` },
      { status: 500 }
    );
  }
}
