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
    const last6Months = Array.from({ length: 6 }, (_, i) =>
      subMonths(currentDate, i)
    );

    // Get current month total
    const currentMonthBills = await db.query.bills.findMany({
      where: and(
        eq(bills.userId, userId),
        gte(bills.dueDate, startOfMonth(currentDate)),
        lt(bills.dueDate, endOfMonth(currentDate))
      ),
    });

    // Get previous month total
    const previousMonthBills = await db.query.bills.findMany({
      where: and(
        eq(bills.userId, userId),
        gte(bills.dueDate, startOfMonth(previousDate)),
        lt(bills.dueDate, endOfMonth(previousDate))
      ),
    });

    // Get last 6 months bills for average
    const last6MonthsBills = await Promise.all(
      last6Months.map(async (month) => {
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
    const average = last6MonthsBills.reduce((acc, total) => acc + total, 0) / 6;

    // Calculate percentage change
    const percentageChange =
      previousTotal > 0
        ? ((currentTotal - previousTotal) / previousTotal) * 100
        : 0;

    return NextResponse.json({
      currentTotal,
      previousTotal,
      average,
      percentageChange,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting bill statistics", error },
      { status: 500 }
    );
  }
}
