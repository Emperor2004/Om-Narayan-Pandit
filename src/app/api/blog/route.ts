import { NextResponse } from "next/server";
import { blogPosts } from "@/data";

export async function GET() {
  return NextResponse.json({ success: true, data: blogPosts });
}
