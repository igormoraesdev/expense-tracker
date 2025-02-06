import { db } from "@/drizzle";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const existingUser = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error on authenticated user", error },
      { status: 500 }
    );
  }
}
