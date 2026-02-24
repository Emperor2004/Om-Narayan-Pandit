import { NextRequest, NextResponse } from "next/server";
import { projects as defaultProjects } from "@/data";
import type { Project } from "@/types";

// In production, use a real database. This is a simple file/memory store for demo.
// For real persistence, replace with Prisma + SQLite or Supabase.
let projectStore: Project[] = [...defaultProjects];

export async function GET() {
  return NextResponse.json({ success: true, data: projectStore });
}

export async function POST(req: NextRequest) {
  // Simple auth check
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: Omit<Project, "id"> = await req.json();
    const newProject: Project = {
      ...body,
      id: `project-${Date.now()}`,
    };
    projectStore = [...projectStore, newProject];
    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: Project = await req.json();
    projectStore = projectStore.map((p) => (p.id === body.id ? body : p));
    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
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

  projectStore = projectStore.filter((p) => p.id !== id);
  return NextResponse.json({ success: true });
}
