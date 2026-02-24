import { NextRequest, NextResponse } from "next/server";
import { publications as defaultPubs } from "@/data";
import type { Publication } from "@/types";

let pubStore: Publication[] = [...defaultPubs];

export async function GET() {
  return NextResponse.json({ success: true, data: pubStore });
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: Omit<Publication, "id"> = await req.json();
    const newPub: Publication = { ...body, id: `pub-${Date.now()}` };
    pubStore = [...pubStore, newPub];
    return NextResponse.json({ success: true, data: newPub }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: Publication = await req.json();
    pubStore = pubStore.map((p) => (p.id === body.id ? body : p));
    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

  pubStore = pubStore.filter((p) => p.id !== id);
  return NextResponse.json({ success: true });
}
