"use server";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema/users";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({
    where: eq(users.email, email!),
  });
};

export const updateUser = async (id: string, user: User) => {
  const updatedUser = await db
    .update(users)
    .set(user)
    .where(eq(users.id, id))
    .returning();

  return updatedUser;
};
