import { NextResponse } from "next/server";

// eslint-disable-next-line import/no-unused-modules
export async function POST(request: Request) {
  try {
    const { productId, quantity, total } = await request.json();

    return NextResponse.json({
      success: true,
      data: { productId, quantity, total },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Error creating order" },
      { status: 500 }
    );
  }
}
