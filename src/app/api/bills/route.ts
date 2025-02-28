import { db } from "@/drizzle";
import { bills } from "@/drizzle/schema/bills";
import { updateBillStatusById } from "@/lib/actions/bills";
import { endOfMonth, startOfMonth } from "date-fns";
import { and, eq, gte, lt } from "drizzle-orm";
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
      { message: "Error to create bill", error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId") as string;
    const date = url.searchParams.get("date") as string;

    const startDate = startOfMonth(new Date(date));
    const endDate = endOfMonth(new Date(date));

    const billsList = await db.query.bills.findMany({
      where: and(
        eq(bills.userId, userId),
        gte(bills.dueDate, startDate),
        lt(bills.dueDate, endDate)
      ),
      // orderBy: sql`CASE WHEN ${bills.status} = 'Expired' THEN 1 ELSE 2 END, ${bills.dueDate} DESC`,
    });

    return NextResponse.json(billsList);
  } catch (error) {
    return NextResponse.json(
      { message: "Error to get bills", error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { billId, bill } = await req.json();

    delete bill.createdAt;

    const payload = {
      ...bill,
      amount: parseFloat(bill.amount),
      updatedAt: new Date(),
      dueDate: new Date(bill.dueDate),
    };

    const updatedBill = await updateBillStatusById(billId, payload);

    return NextResponse.json(updatedBill);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error to update bill", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { billId } = await req.json();

    await db.delete(bills).where(eq(bills.id, billId));

    return NextResponse.json({ message: "Bill deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error to delete bill", error },
      { status: 500 }
    );
  }
}
