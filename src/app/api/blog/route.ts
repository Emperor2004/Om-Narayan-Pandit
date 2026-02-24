import { NextRequest, NextResponse } from "next/server";
import { blogPosts as defaultPosts } from "@/data";
import type { BlogPost } from "@/types";
import { slugify, readTime } from "@/lib/utils";

let postStore: BlogPost[] = [...defaultPosts];

export async function GET() {
  return NextResponse.json({ success: true, data: postStore });
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: Omit<BlogPost, "id" | "slug" | "readTime"> = await req.json();
    const newPost: BlogPost = {
      ...body,
      id: `post-${Date.now()}`,
      slug: slugify(body.title),
      readTime: readTime(body.content),
    };
    postStore = [...postStore, newPost];
    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
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
    const body: BlogPost = await req.json();
    const updated = { ...body, readTime: readTime(body.content) };
    postStore = postStore.map((p) => (p.id === body.id ? updated : p));
    return NextResponse.json({ success: true, data: updated });
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

  postStore = postStore.filter((p) => p.id !== id);
  return NextResponse.json({ success: true });
}
