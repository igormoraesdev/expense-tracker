import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const customerIdTest = "cus_S8sXjLbdahwuUH";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const planId = formData.get("planId") as string;

    const headersList = await headers();
    const origin = headersList.get("origin") || "";

    const customerId = customerIdTest;
    if (!customerId) {
      return NextResponse.json(
        { error: "Usuário não possui customer vinculado" },
        { status: 400 }
      );
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
    });

    for (const sub of subscriptions.data) {
      await stripe.subscriptions.cancel(sub.id);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard/plans/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/plans/canceled?canceled=true`,
    });

    return NextResponse.json(session);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
