import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/issues/new", "/issues/:id/edit"], // Apply middleware to specific routes
};
