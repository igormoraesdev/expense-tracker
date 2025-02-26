import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { BillsList } from "./BillsList";
import { DialogBills } from "./DialogBills";

export const BillsGrid = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill>();
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <BillsList onOpenDialog={setOpenDialog} onSelectBill={setSelectedBill} />
      <DialogBills isEdit onOpenDialog={setOpenDialog} bill={selectedBill} />
    </Dialog>
  );
};
