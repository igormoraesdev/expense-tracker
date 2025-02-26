import { updateUser } from "@/lib/actions/users";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { userId, user } = await req.json();

    const updatedBill = await updateUser(userId, user);

    return NextResponse.json(updatedBill);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error to update user", error },
      { status: 500 }
    );
  }
}
