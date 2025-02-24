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

import { useQueryClient } from "@tanstack/react-query";

type BillsCardProps = {
  bill: Bill;
};

export const BillsCard = ({ bill }: BillsCardProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync } = useUpdateBill({
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

  return (
    <div className="grid w-full p-6 sm:p-8 bg-indigo-100 border-2 border-gray-200 rounded-md gap-4">
      <div className="flex items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[48px] sm:w-[48px] bg-white border-2 border-indigo-200">
            <CategoryBadge category={bill.category as CategoryEnum} />
          </div>
          <p className="text-sm sm:text-lg font-bold">{bill.description}</p>
        </div>
        <p className="text-2xl text-indigo-900 font-medium">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(bill.amount))}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm sm:text-lg font-light">Due Date:</p>
          <p className="text-sm sm:text-lg text-indigo-900 font-medium">
            {format(new Date(bill.dueDate), "dd/MM/yyyy")}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm sm:text-lg font-light">Status:</p>
          <BillBadge bill={bill} />
        </div>
        {bill.status !== StatusEnum.Paid && (
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
                <DropdownMenuItem className="focus:bg-indigo-100 focus:text-indigo-700">
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleUpdateStatus(bill, StatusEnum.Paid)}
                  className="focus:bg-indigo-100 focus:text-indigo-700"
                >
                  Paid
                </DropdownMenuItem>
                {bill.status !== StatusEnum.Pending && (
                  <DropdownMenuItem className="focus:bg-indigo-100 focus:text-indigo-700">
                    Pending
                  </DropdownMenuItem>
                )}
                {bill.status !== StatusEnum.Expired && (
                  <DropdownMenuItem
                    onClick={() => handleUpdateStatus(bill, StatusEnum.Expired)}
                    className="focus:bg-indigo-100 focus:text-indigo-700"
                  >
                    Expired
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
