"use client";

import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import { DialogBills } from "../Dashboard/components/DialogBills";
import { ExpensesList } from "./components/ExpensesList";
import { TotalSpend } from "./components/TotalSpend";

export function ExpensesContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | undefined>(undefined);
  return (
    <div className="container flex flex-col mx-auto p-6 gap-8">
      <TotalSpend />
      <ExpensesList
        onOpenDialog={setOpenDialog}
        onSelectBill={setSelectedBill}
      />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogBills onOpenDialog={setOpenDialog} bill={selectedBill} isEdit />
      </Dialog>
    </div>
  );
}
