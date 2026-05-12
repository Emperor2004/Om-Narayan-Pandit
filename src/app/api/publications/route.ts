import { NextRequest, NextResponse } from "next/server";
import { publications as defaultPubs } from "@/data";
import { validateAdminRequest } from "@/lib/adminAuth";
import type { Publication } from "@/types";

// Admin edits reset whenever the server process restarts.
let pubStore: Publication[] = [...defaultPubs];

export async function GET() {
  return NextResponse.json({ success: true, data: pubStore });
}

export async function POST(req: NextRequest) {
  const authError = validateAdminRequest(req);
  if (authError) return authError;

  try {
    const body: Omit<Publication, "id"> = await req.json();
    
    // Validate required fields
    if (!body.title || !body.venue || !body.year || !body.description || !body.status || !Array.isArray(body.authors) || !Array.isArray(body.tags)) {
      return NextResponse.json({ 
        success: false, 
        error: "Missing required fields: title, venue, year, description, status, authors, tags" 
      }, { status: 400 });
    }

    const newPub: Publication = { ...body, id: `pub-${Date.now()}` };
    pubStore = [...pubStore, newPub];
    return NextResponse.json({ success: true, data: newPub }, { status: 201 });
  } catch (error) {
    console.error("Publications API POST error:", error);
    return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = validateAdminRequest(req);
  if (authError) return authError;

  try {
    const body: Publication = await req.json();
    pubStore = pubStore.map((p) => (p.id === body.id ? body : p));
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("Publications API PUT error:", error);
    return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = validateAdminRequest(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

  pubStore = pubStore.filter((p) => p.id !== id);
  return NextResponse.json({ success: true });
}
