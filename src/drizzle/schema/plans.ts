import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const plans = pgTable("plans", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  price: varchar("price").notNull(),
  priceId: varchar("price_id").notNull(),
  description: text("description").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Plan = typeof plans.$inferSelect;
