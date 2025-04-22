import { db } from "@/drizzle";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const plansList = await db.query.plans.findMany();

    return NextResponse.json(plansList);
  } catch (error) {
    return NextResponse.json(
      { message: "Error to get plans", error },
      { status: 500 }
    );
  }
}
