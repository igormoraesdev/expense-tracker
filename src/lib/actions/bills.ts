import { db } from "@/drizzle";
import { bills } from "@/drizzle/schema/bills";
import { eq } from "drizzle-orm";

export async function updateBillStatusById(id: string, bill: Partial<Bill>) {
  const updatedBill = await db
    .update(bills)
    .set(bill)
    .where(eq(bills.id, id))
    .returning();

  return updatedBill;
}
