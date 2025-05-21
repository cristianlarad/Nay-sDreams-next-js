import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { productId, quantity, total, imageUrl, productTitle } =
      await request.json();

    console.log(productId, quantity, total, imageUrl, productTitle);
    return NextResponse.json({
      success: true,
      data: { productId, quantity, total, imageUrl, productTitle },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Error creating order" },
      { status: 500 }
    );
  }
}
