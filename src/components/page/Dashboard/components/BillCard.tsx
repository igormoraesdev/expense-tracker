"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateBill } from "@/hooks/api/bills/useUpdateBill";
import { useToast } from "@/hooks/use-toast";
import { CategoryEnum, StatusEnum } from "@/lib/entities/bills/enum";
import { format } from "date-fns";
import { Ellipsis } from "lucide-react";
import { BillBadge } from "./BillBadge";
import { CategoryBadge } from "./CategoryBadge";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDeleteBill } from "@/hooks/api/bills/useDeleteBill";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

type BillsCardProps = {
  bill: Bill;
  onOpenDialog: Dispatch<SetStateAction<boolean>>;
  onSelectBill: (val: Bill) => void;
};

export const BillsCard = ({
  bill,
  onSelectBill,
  onOpenDialog,
}: BillsCardProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync } = useUpdateBill({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
  const { mutateAsync: mutateAsyncDelete } = useDeleteBill({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });

  const handleUpdateStatus = async (bill: Bill, status: StatusEnum) => {
    try {
      const id = bill.id as string;

      await mutateAsync({
        billId: id,
        bill: { ...bill, status, updatedAt: new Date() },
      });
      toast({
        description: "Bill updated successfully",
        className: "bg-green-500 text-white",
        duration: 5000,
      });
    } catch (error: any) {
      toast({
        className: "bg-red-500 text-white",
        description: error.message,
      });
    }
  };

  const handleEditBill = (bill: Bill) => {
    onOpenDialog(true);
    onSelectBill(bill);
  };

  const handleDeleteBill = async (bill: Bill) => {
    try {
      await mutateAsyncDelete(bill.id as string);
      toast({
        description: "Bill deleted successfully",
        className: "bg-green-500 text-white",
        duration: 5000,
      });
    } catch (error: any) {
      toast({
        className: "bg-red-500 text-white",
        description: error.message,
      });
    }
  };

  return (
    <div className="grid w-full p-4 bg-white border-2 border-indigo-100 rounded-xl gap-4 shadow-xl">
      <Accordion type="single" collapsible>
        <AccordionItem value={bill.id as string}>
          <AccordionTrigger className="flex items-center justify-between outline-none hover:no-underline">
            <div className="flex flex-row items-center gap-4">
              <CategoryBadge category={bill.category as CategoryEnum} />
              <p className="text-xs font-bold text-left text-wrap max-w-[200px] break-words">
                {bill.description}
              </p>
              <BillBadge bill={bill} />
              <p className="font-medium text-indigo-900">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(bill.amount))}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-light">Due Date:</p>
                  <p className="text-sm text-indigo-900 font-medium">
                    {format(new Date(bill.dueDate), "dd/MM/yyyy")}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="size-8 rounded-full">
                    <Button
                      variant="default"
                      size={"icon"}
                      className="p-1 outline-none justify-self-end"
                    >
                      <Ellipsis size={20} className="w-[24px] h-[24px]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => handleEditBill(bill)}
                        className="focus:bg-indigo-100 focus:text-indigo-700"
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteBill(bill)}
                        className="focus:bg-indigo-100 focus:text-indigo-700"
                      >
                        Delete
                      </DropdownMenuItem>
                      {bill.status !== StatusEnum.Paid && (
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateStatus(bill, StatusEnum.Paid)
                          }
                          className="focus:bg-indigo-100 focus:text-indigo-700"
                        >
                          Status: Paid
                        </DropdownMenuItem>
                      )}
                      {bill.status !== StatusEnum.Pending &&
                        bill.status !== StatusEnum.Expired && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(bill, StatusEnum.Pending)
                            }
                            className="focus:bg-indigo-100 focus:text-indigo-700"
                          >
                            Status: Pending
                          </DropdownMenuItem>
                        )}
                      {bill.status !== StatusEnum.Expired && (
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateStatus(bill, StatusEnum.Expired)
                          }
                          className="focus:bg-indigo-100 focus:text-indigo-700"
                        >
                          Status: Expired
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
