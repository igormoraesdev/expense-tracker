import { PlansIdEnum } from "@/lib/entities/plans/enum";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { plans } from "./plans";
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  planId: uuid("plan_id")
    .notNull()
    .default(PlansIdEnum.Gratuito)
    .references(() => plans.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
