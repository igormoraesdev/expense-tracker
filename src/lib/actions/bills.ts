import { db } from "@/drizzle";
import { bills } from "@/drizzle/schema/bills";
import { users } from "@/drizzle/schema/users";
import { whatsapp } from "@/drizzle/schema/whatsapp";
import { addDays, startOfDay } from "date-fns";
import { and, eq, gte, lt, or } from "drizzle-orm";
import { StatusEnum } from "../entities/bills/enum";
import { WhatsappService } from "../service/whatsapp";

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
    console.log("Nenhuma conta vencida para atualizar");
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

  console.log(
    `Atualizadas ${expiredBills.length} contas para status "vencida".`
  );
}

export async function sendMessageExpiredBills() {
  const today = startOfDay(new Date());
  const fiveDaysFromNow = startOfDay(addDays(today, 5));

  const billsList = await db
    .select({
      bill: bills,
      user: {
        id: users.id,
        name: users.name,
        phone: users.phone,
      },
    })
    .from(bills)
    .innerJoin(users, eq(bills.userId, users.id))
    .innerJoin(whatsapp, eq(users.id, whatsapp.userId))
    .where(
      and(
        eq(whatsapp.optedIn, true), // ✅ Filtra apenas usuários com opt-in ativo
        or(
          and(
            gte(bills.dueDate, today),
            lt(bills.dueDate, fiveDaysFromNow),
            eq(bills.status, StatusEnum.Pending)
          ),
          eq(bills.status, StatusEnum.Expired)
        )
      )
    );

  if (billsList.length === 0) {
    console.log("📭 Nenhuma conta para enviar mensagem");
    return;
  }

  // Agrupar contas por usuário
  const groupedByUser = billsList.reduce((acc, { bill, user }) => {
    if (!acc[user.id]) {
      acc[user.id] = {
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone as string,
        },
        bills: [],
      };
    }
    acc[user.id].bills.push(bill);
    return acc;
  }, {} as Record<string, { user: { id: string; name: string; phone: string }; bills: any[] }>);

  for (const userId in groupedByUser) {
    const { user, bills } = groupedByUser[userId];

    if (user.phone) {
      await WhatsappService.sendReminderTemplate(user.phone, user.name, bills);
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
