import { db } from "@/drizzle";
import { users } from "@/drizzle/schema/users";
import { getUserByEmail } from "@/lib/actions/users";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { message: "User already registered" },
        { status: 400 }
      );
    }

    console.log(phone, name, email);

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error on creating user", error },
      { status: 500 }
    );
  }
}
