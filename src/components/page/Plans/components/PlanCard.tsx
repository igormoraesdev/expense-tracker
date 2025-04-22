"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plans } from "@/lib/entities/plans/enum";
import { PlansService } from "@/lib/service/plans";
import { loadStripe } from "@stripe/stripe-js/pure";
import { cx } from "class-variance-authority";
import { Check, Crown } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  selectedPlan: Plan;
  currentPlan: Plans;
  onSelectPlan: (plan: Plan) => void;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export function PlanCard({ plan, currentPlan, onSelectPlan }: PlanCardProps) {
  const handleFetchCheckout = async () => {
    try {
      const res = await PlansService.checkoutSession(plan.priceId);
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: res.id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickPlan = () => {
    onSelectPlan(plan);
    handleFetchCheckout();
  };

  return (
    <>
      <Card
        className={cx(
          "relative min-h-[530px] flex flex-col border-indigo-300/20 bg-white/5 backdrop-blur-sm hover:bg-indigo-900/10 transition-all duration-300 overflow-hidden",
          plan.id === currentPlan && "ring-4 ring-emerald-600"
        )}
      >
        {plan.id === currentPlan && (
          <div className="absolute -right-10 top-5 transform rotate-45 w-40 bg-gradient-to-b from-emerald-400 to-emerald-900 text-white text-md py-1 text-center font-semibold shadow-lg">
            Ativo
          </div>
        )}

        {plan.isPopular && (
          <div className="absolute -left-2 top-4">
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-600 text-white text-xs px-4 py-1 rounded-r-full font-medium flex items-center gap-1 shadow-md">
              <Crown size={12} />
              <span>MAIS POPULAR</span>
            </div>
          </div>
        )}

        <div
          className={cx(
            "absolute inset-0 opacity-10 bg-gradient-to-b",
            plan.bgGradient
          )}
        ></div>

        <CardHeader className="relative z-10 pb-2">
          <div className="mb-2 flex items-center justify-center">
            <div className={cx("rounded-full p-3", plan.accentColor)}>
              {plan.icon}
            </div>
          </div>
          <CardTitle className="text-xl text-white text-center">
            {plan.name}
          </CardTitle>
          <CardDescription className="text-indigo-200/70 text-center">
            {plan.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 flex flex-col gap-4">
          <div className="flex items-baseline justify-center text-white">
            <span className="text-4xl font-bold">{plan.price}</span>
            {plan.period && (
              <span className="text-sm text-indigo-200/70 ml-1">
                {plan.period}
              </span>
            )}
          </div>

          <ul className="mt-6 space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20">
                  <Check size={12} className="text-indigo-400" />
                </div>
                <span className="ml-3 text-indigo-100 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="relative z-10 mt-auto pt-4">
          <Button
            variant={plan.id === currentPlan ? "outline" : "default"}
            className={cx(
              "w-full shadow-lg",
              plan.id === currentPlan
                ? "bg-transparent border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10"
                : `${plan.accentColor} text-white hover:opacity-90`
            )}
            disabled={plan.id === currentPlan}
            onClick={handleClickPlan}
          >
            {plan.id === currentPlan ? "Plano Atual" : "Assinar Plano"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
