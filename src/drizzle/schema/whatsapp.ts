import { boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const whatsapp = pgTable("whatsapp", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  optedIn: boolean("opted_in").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
