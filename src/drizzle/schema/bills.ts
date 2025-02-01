import { StatusEnum } from "@/lib/entities/bills/enum";
import {
  decimal,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const statusEnum = pgEnum("status", [
  StatusEnum.Paid,
  StatusEnum.Pending,
  StatusEnum.Late,
]);

export const bills = pgTable("bills", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  description: varchar("description", { length: 255 }).notNull(),
  dueDate: timestamp("due_date").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: statusEnum("status").default(StatusEnum.Pending),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
