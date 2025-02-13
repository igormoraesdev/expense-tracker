import { db } from "@/drizzle";
import { bills } from "@/drizzle/schema/bills";
import { endOfMonth, startOfMonth } from "date-fns";
import { and, eq, gte, lt } from "drizzle-orm";
import { NextResponse } from "next/server";

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
      orderBy: bills.dueDate,
    });

    const formatedList = billsList.map((bill) => ({
      ...bill,
      amount: parseFloat(bill.amount.toString()),
    }));

    const totalSpend = formatedList.reduce((acc, bill) => acc + bill.amount, 0);

    const response = totalSpend.toFixed(2);

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error to get total spend", error },
      { status: 500 }
    );
  }
}
