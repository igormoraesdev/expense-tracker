import { db } from "@/drizzle";
import { bills } from "@/drizzle/schema/bills";
import { users } from "@/drizzle/schema/users";
import { addDays, startOfDay } from "date-fns";
import { and, eq, gte, lt, or } from "drizzle-orm";
import { StatusEnum } from "../entities/bills/enum";
import { WhatsappService } from "../service";

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
  const threeDaysFromNow = startOfDay(addDays(today, 3));

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
      and(
        gte(bills.dueDate, today),
        lt(bills.dueDate, threeDaysFromNow),
        or(
          eq(bills.status, StatusEnum.Pending),
          eq(bills.status, StatusEnum.Expired)
        )
      )
    );

  const listBills = billsList.map((data) => data.bill);
  const user = billsList[0].user;
  const message = WhatsappService.generateMessage(listBills, user.name);
  await WhatsappService.sendWhatsAppMessage(user.phone as string, message);
}
