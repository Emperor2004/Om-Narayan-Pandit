import { NextRequest, NextResponse } from "next/server";
import { blogPosts as defaultPosts } from "@/data";
import type { BlogPost } from "@/types";
import { validateAdminRequest } from "@/lib/adminAuth";
import { slugify, readTime } from "@/lib/utils";

// Admin edits reset whenever the server process restarts.
let postStore: BlogPost[] = [...defaultPosts];

export async function GET() {
  return NextResponse.json({ success: true, data: postStore });
}

export async function POST(req: NextRequest) {
  const authError = validateAdminRequest(req);
  if (authError) return authError;

  try {
    const body: Omit<BlogPost, "id" | "slug" | "readTime"> = await req.json();
    
    // Validate required fields
    if (!body.title || !body.excerpt || !body.content || !Array.isArray(body.tags) || typeof body.published !== 'boolean') {
      return NextResponse.json({ 
        success: false, 
        error: "Missing required fields: title, excerpt, content, tags, published" 
      }, { status: 400 });
    }

    const newPost: BlogPost = {
      ...body,
      id: `post-${Date.now()}`,
      slug: slugify(body.title),
      readTime: readTime(body.content),
      publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
    };
    postStore = [...postStore, newPost];
    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    console.error("Blog API POST error:", error);
    return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = validateAdminRequest(req);
  if (authError) return authError;

  try {
    const body: BlogPost = await req.json();
    const updated = { ...body, readTime: readTime(body.content) };
    postStore = postStore.map((p) => (p.id === body.id ? updated : p));
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Blog API PUT error:", error);
    return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = validateAdminRequest(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

  postStore = postStore.filter((p) => p.id !== id);
  return NextResponse.json({ success: true });
}
