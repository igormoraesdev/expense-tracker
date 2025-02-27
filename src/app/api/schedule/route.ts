import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    console.log("Cron Job ran at:", new Date());

    return new NextResponse("Cron ran", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error to get total spend", error },
      { status: 500 }
    );
  }
}
