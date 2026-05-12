import { NextRequest, NextResponse } from "next/server";
import { validateAdminRequest } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const authError = validateAdminRequest(req);
  if (authError) return authError;

  return NextResponse.json({ success: true });
}
