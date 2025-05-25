import { NextResponse } from "next/server";

import { getPocketBase } from "@/lib/pocketbase";

export async function POST(request: Request) {
  const pb = await getPocketBase();
  const { status, id } = await request.json();
  await pb.collection("pedido").update(id, {
    status: status,
  });

  return NextResponse.json({ success: true });
}
