import { db } from "@/drizzle";
import { bills } from "@/drizzle/schema/bills";
import { users } from "@/drizzle/schema/users";
import { addDays, startOfDay } from "date-fns";
import { and, eq, gte, lt, or } from "drizzle-orm";
import { StatusEnum } from "../entities/bills/enum";
import { WhatsappService } from "../service/whatsapp";

interface GroupedBills {
  [key: string]: {
    user: User;
    bills: Bill[];
  };
}

export async function updateBillStatusById(id: string, bill: Partial<Bill>) {
  const updatedBill = await db
    .update(bills)
    .set(bill)
    .where(eq(bills.id, id))
    .returning();

  return updatedBill;
}

export async function updateExpiredBills() {
  const today = new Date();

  const expiredBills = await db.query.bills.findMany({
    where: and(lt(bills.dueDate, today), eq(bills.status, StatusEnum.Pending)),
  });

  if (expiredBills.length === 0) {
    console.log("No expired bills to update");
    return;
  }

  await Promise.all(
    expiredBills.map((bill) =>
      db
        .update(bills)
        .set({ status: StatusEnum.Expired })
        .where(eq(bills.id, bill.id))
        .execute()
    )
  );

  console.log(`Updated ${expiredBills.length} to status "expired".`);
}

export async function sendMessageExpiredBills() {
  const today = startOfDay(new Date());
  const threeDaysFromNow = startOfDay(addDays(today, 5));

  const billsList = await db
    .select({
      bill: bills,
      user: {
        name: users.name,
        phone: users.phone,
      },
    })
    .from(bills)
    .innerJoin(users, eq(bills.userId, users.id))
    .where(
      or(
        and(
          gte(bills.dueDate, today),
          lt(bills.dueDate, threeDaysFromNow),
          eq(bills.status, StatusEnum.Pending)
        ),
        eq(bills.status, StatusEnum.Expired)
      )
    );

  if (billsList.length === 0) {
    console.log("No bills to send message");
    return;
  }

  const groupedByUser = billsList.reduce<GroupedBills>(
    (acc, { bill, user }) => {
      if (!acc[bill.userId as string]) {
        acc[bill.userId as string] = {
          user: user as User,
          bills: [],
        };
      }
      acc[bill.userId as string].bills.push(bill);
      return acc;
    },
    {}
  );

  for (const userId in groupedByUser) {
    const { user, bills } = groupedByUser[userId];
    if (user.phone) {
      const message = WhatsappService.generateMessage(bills, user.name);
      await WhatsappService.sendWhatsAppMessage(user.phone, message);
    }
  }
}

export async function getBillsByMonth(
  startDate: Date,
  endDate: Date,
  userId: string
) {
  return await db.query.bills.findMany({
    where: and(
      eq(bills.userId, userId),
      gte(bills.dueDate, startDate),
      lt(bills.dueDate, endDate)
    ),
  });
}
