import { db } from "@/drizzle";
import { bills } from "@/drizzle/schema/bills";
import { endOfYear, startOfYear } from "date-fns";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId") as string;

    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const offset = (page - 1) * limit;

    const startOfCurrentYear = startOfYear(new Date());
    const endOfCurrentYear = endOfYear(new Date());

    const billsList = await db.query.bills.findMany({
      where: and(
        eq(bills.userId, userId),
        gte(bills.dueDate, startOfCurrentYear),
        lte(bills.dueDate, endOfCurrentYear)
      ),
      offset,
      limit,
      orderBy: [desc(bills.dueDate)],
    });

    const totalCount = await db
      .select({ count: sql`count(*)` })
      .from(bills)
      .where(eq(bills.userId, userId));

    const allBills = await db.query.bills.findMany({
      where: eq(bills.userId, userId),
    });

    const totalSpend = allBills.reduce(
      (acc, bill) => acc + Number(bill.amount),
      0
    );

    return NextResponse.json({
      bills: billsList,
      totalSpend,
      pagination: {
        total: Number(totalCount?.[0]?.count),
        page,
        limit,
        totalPages: Math.ceil(Number(totalCount?.[0]?.count) / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error to get all bills", error },
      { status: 500 }
    );
  }
}
