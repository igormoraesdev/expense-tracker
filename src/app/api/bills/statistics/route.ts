import { getBillsByMonth } from "@/lib/actions/bills";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
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

    const currentMonthBills = await getBillsByMonth(
      startOfMonth(currentDate),
      endOfMonth(currentDate),
      userId
    );

    const previousMonthBills = await getBillsByMonth(
      startOfMonth(previousDate),
      endOfMonth(previousDate),
      userId
    );

    const last6MonthsBills = await Promise.all(
      last6Months.map(async (month) => {
        const monthBills = await getBillsByMonth(
          startOfMonth(month),
          endOfMonth(month),
          userId
        );
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
