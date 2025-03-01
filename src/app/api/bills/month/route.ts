import { db } from "@/drizzle";
import { bills } from "@/drizzle/schema/bills";
import { getBillsByMonth } from "@/lib/actions/bills";
import { StatusEnum } from "@/lib/entities/bills/enum";
import { endOfMonth, startOfMonth } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, date } = await req.json();

    const startDate = startOfMonth(new Date(date));
    const endDate = endOfMonth(new Date(date));

    const billsList = (await getBillsByMonth(
      startDate,
      endDate,
      userId
    )) as Bill[];

    const newBills = billsList.map((bill) => {
      const billDate = new Date(bill.dueDate);
      delete bill.id;

      return {
        ...bill,
        dueDate: new Date(billDate.setMonth(new Date().getMonth())),
        status: StatusEnum.Pending,
        createdAt: new Date(),
      };
    });

    for (const bill of newBills) {
      await db.insert(bills).values({
        ...bill,
        userId,
      });
    }

    return NextResponse.json(newBills);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error ao criar despesas do mês anterior", error },
      { status: 500 }
    );
  }
}
