import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { DialogContent } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

type DialogCheckoutProps = {
  onOpenDialog: Dispatch<SetStateAction<boolean>>;
  selectedPlan: Plan;
};

export function DialogCheckout({
  onOpenDialog,
  selectedPlan,
}: DialogCheckoutProps) {
  return (
    <DialogContent
      onClose={() => {
        onOpenDialog(false);
      }}
      className="[&>button]:text-black sm:max-w-[550px] min-h-[500px] p-6 shadow-lg rounded-md overflow-hidden"
    >
      <DialogHeader className="flex items-start">
        <DialogTitle className="text-2xl font-bold text-black">
          {`Assinatura do Plano ${selectedPlan.name}`}
        </DialogTitle>
      </DialogHeader>
    </DialogContent>
  );
}
