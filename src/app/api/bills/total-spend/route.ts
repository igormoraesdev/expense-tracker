import { db } from "@/drizzle";
import { bills } from "@/drizzle/schema/bills";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { and, eq, gte, lt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId") as string;
    const date = url.searchParams.get("date") as string;

    const currentDate = new Date(date);
    const previousDate = subMonths(currentDate, 1);
    const last3Months = Array.from({ length: 3 }, (_, i) =>
      subMonths(currentDate, i)
    );

    // Get current month bills
    const currentMonthBills = await db.query.bills.findMany({
      where: and(
        eq(bills.userId, userId),
        gte(bills.dueDate, startOfMonth(currentDate)),
        lt(bills.dueDate, endOfMonth(currentDate))
      ),
    });

    // Get previous month bills
    const previousMonthBills = await db.query.bills.findMany({
      where: and(
        eq(bills.userId, userId),
        gte(bills.dueDate, startOfMonth(previousDate)),
        lt(bills.dueDate, endOfMonth(previousDate))
      ),
    });

    // Get last 6 months bills for average
    const last3MonthsBills = await Promise.all(
      last3Months.map(async (month) => {
        const monthBills = await db.query.bills.findMany({
          where: and(
            eq(bills.userId, userId),
            gte(bills.dueDate, startOfMonth(month)),
            lt(bills.dueDate, endOfMonth(month))
          ),
        });
        return monthBills.reduce((acc, bill) => acc + Number(bill.amount), 0);
      })
    );

    const currentTotal = currentMonthBills.reduce(
      (acc, bill) => acc + Number(bill.amount),
      0
    );
    const previousTotal = previousMonthBills.reduce(
      (acc, bill) => acc + Number(bill.amount),
      0
    );
    const average = last3MonthsBills.reduce((acc, total) => acc + total, 0) / 3;

    // Calculate percentage change
    const percentageChange =
      previousTotal > 0
        ? ((currentTotal - previousTotal) / previousTotal) * 100
        : 0;

    return NextResponse.json({
      totalSpend: currentTotal.toFixed(2),
      previousMonth: previousTotal.toFixed(2),
      average: average.toFixed(2),
      percentageChange: percentageChange.toFixed(1),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error to get total spend", error },
      { status: 500 }
    );
  }
}
