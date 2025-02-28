import { sendMessageExpiredBills } from "@/lib/actions/bills";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    console.log("Cron Job ran at:", new Date(), req.url);

    await sendMessageExpiredBills();
    // await updateExpiredBills();

    return new NextResponse("Cron ran", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error to get total spend", error },
      { status: 500 }
    );
  }
}
