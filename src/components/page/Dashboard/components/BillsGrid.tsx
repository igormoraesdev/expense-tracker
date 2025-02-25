import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { DialogBills } from "./DialogBills";
import { PaidBillsList } from "./PaidBillsList";
import { PendingBillsList } from "./PendingBillsList";

export const BillsGrid = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill>();
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <PendingBillsList
        onOpenDialog={setOpenDialog}
        onSelectBill={setSelectedBill}
      />
      <PaidBillsList />
      <DialogBills isEdit onOpenDialog={setOpenDialog} bill={selectedBill} />
    </Dialog>
  );
};
