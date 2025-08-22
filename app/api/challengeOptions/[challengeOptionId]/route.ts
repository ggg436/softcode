import { NextResponse } from "next/server";

// TODO: Implement when database is set up
// import { eq } from "drizzle-orm";
// import db from "@/db/drizzle";
// import { challengeOptions } from "@/db/schema";
// import { isAdmin } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: { challengeOptionId: number } },
) => {
  // TODO: Implement when database is set up
  return NextResponse.json({ message: "Not implemented yet" });
};

export const PUT = async (
  req: Request,
  { params }: { params: { challengeOptionId: number } },
) => {
  // TODO: Implement when database is set up
  return NextResponse.json({ message: "Not implemented yet" });
};

export const DELETE = async (
  req: Request,
  { params }: { params: { challengeOptionId: number } },
) => {
  // TODO: Implement when database is set up
  return NextResponse.json({ message: "Not implemented yet" });
};
