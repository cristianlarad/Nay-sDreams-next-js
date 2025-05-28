import { NextResponse } from "next/server";

import { getPocketBase } from "@/lib/pocketbase";

export async function POST(request: Request) {
  try {
    const {
      productId,
      quantity,
      total,
      imageUrl,
      productTitle,
      productTitleEn,
      user,
      aditional,
      status,
      pedidoId,
    } = await request.json();
    const pb = await getPocketBase(request.headers.get("cookie"));
    const response = await pb.collection("pedido").create({
      productId,
      quantity,
      total,
      imageUrl,
      productTitle,
      productTitleEn,
      user,
      aditional,
      pedidoId,
      status: status ?? "1",
    });
    return NextResponse.json({
      success: true,
      data: {
        response,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Error creating order" },
      { status: 500 }
    );
  }
}
