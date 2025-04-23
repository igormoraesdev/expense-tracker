import SuccessContent from "@/components/page/Plans/Success/SuccessContent";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) return redirect("/plans");

  const { status, customer_details, customer } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const subscriptions = await stripe.subscriptions.list({
    customer: customer as string,
    status: "active",
  });

  console.log(subscriptions);

  const customerEmail = customer_details?.email as string;

  if (status === "open") {
    return redirect("/plans");
  }

  if (status === "complete") {
    return <SuccessContent customerEmail={customerEmail} />;
  }
}
