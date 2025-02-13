import { db } from "@/drizzle";
import { bills } from "@/drizzle/schema/bills";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, description, dueDate, amount, category, status } =
      await req.json();

    const bill = await db.insert(bills).values({
      userId,
      description,
      dueDate: new Date(dueDate),
      amount,
      category,
      status,
    });

    return NextResponse.json(bill);
  } catch (error) {
    return NextResponse.json(
      { message: "Error to create bills", error },
      { status: 500 }
    );
  }
}
