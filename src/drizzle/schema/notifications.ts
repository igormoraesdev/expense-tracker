import { NotificationsEnum } from "@/lib/entities/notifications/enum";
import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { bills } from "./bills";
import { users } from "./users";

export const notificationsEnum = pgEnum("notification_type", [
  NotificationsEnum.Email,
  NotificationsEnum.Whatsapp,
]);

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  billId: uuid("bill_id").references(() => bills.id, { onDelete: "cascade" }),
  notificationType: notificationsEnum("notification_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
