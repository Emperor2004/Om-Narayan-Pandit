import { NextRequest, NextResponse } from "next/server";
import { projects as defaultProjects } from "@/data";
import { validateAdminRequest } from "@/lib/adminAuth";
import type { Project } from "@/types";

// In production, use a real database. This is a simple file/memory store for demo.
// Admin edits reset whenever the server process restarts.
// For real persistence, replace with Prisma + SQLite or Supabase.
let projectStore: Project[] = [...defaultProjects];

export async function GET() {
  return NextResponse.json({ success: true, data: projectStore });
}

export async function POST(req: NextRequest) {
  const authError = validateAdminRequest(req);
  if (authError) return authError;

  try {
    const body: Omit<Project, "id"> = await req.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.type || !Array.isArray(body.tags) || typeof body.featured !== 'boolean') {
      return NextResponse.json({ 
        success: false, 
        error: "Missing required fields: title, description, type, tags, featured" 
      }, { status: 400 });
    }

    const newProject: Project = {
      ...body,
      id: `project-${Date.now()}`,
      createdAt: body.createdAt || new Date().toISOString().split('T')[0],
      status: body.status || 'prototype',
    };
    projectStore = [...projectStore, newProject];
    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    console.error("Projects API POST error:", error);
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = validateAdminRequest(req);
  if (authError) return authError;

  try {
    const body: Project = await req.json();
    projectStore = projectStore.map((p) => (p.id === body.id ? body : p));
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("Projects API PUT error:", error);
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = validateAdminRequest(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

  projectStore = projectStore.filter((p) => p.id !== id);
  return NextResponse.json({ success: true });
}
