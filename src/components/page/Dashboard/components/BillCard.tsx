"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteBill } from "@/hooks/api/bills/useDeleteBill";
import { useUpdateBill } from "@/hooks/api/bills/useUpdateBill";
import { useToast } from "@/hooks/use-toast";
import { CategoryEnum, StatusEnum } from "@/lib/entities/bills/enum";
import { formatCurrency, translateStatus } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Calendar,
  Check,
  MoreHorizontal,
  Pencil,
  ShieldAlert,
  Timer,
  Trash2,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { BillBadge } from "./BillBadge";
import { CategoryBadge } from "./CategoryBadge";

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
      queryClient.invalidateQueries({ queryKey: ["total-spend"] });
    },
  });
  const { mutateAsync: mutateAsyncDelete } = useDeleteBill({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      queryClient.invalidateQueries({ queryKey: ["total-spend"] });
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
        description: "Status atualizado com sucesso",
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
        description: "Despesa excluída com sucesso",
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
    <div className="relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl group">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-indigo-50 opacity-95" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
      <div className="absolute top-0 right-0 w-40 h-40 transform translate-x-20 -translate-y-20 bg-indigo-100/30 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 transform -translate-x-20 translate-y-20 bg-violet-100/30 rounded-full blur-2xl" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 transform -translate-y-1/2 bg-indigo-50/50 rounded-full blur-xl" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl border border-indigo-200 backdrop-blur-sm" />
      </div>
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-row items-center gap-4">
            <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-sm border border-indigo-100/50">
              <CategoryBadge
                category={bill.category as CategoryEnum}
                className="size-6"
              />
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <p className="text-sm font-semibold text-indigo-950 text-left text-wrap max-w-[200px] break-words tracking-tight">
                {bill.description}
              </p>
              <BillBadge bill={bill} />
            </div>
          </div>
          <p className="font-bold text-md text-indigo-950 tracking-tight bg-indigo-50/70 px-3 py-1.5 rounded-lg shadow-sm border border-indigo-100/50">
            {formatCurrency(Number(bill.amount))}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-indigo-100">
          <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-lg shadow-sm border border-indigo-100/50">
            <Calendar className="size-4 text-indigo-500" strokeWidth={1.5} />
            <p className="text-sm text-indigo-900 font-medium">
              {format(new Date(bill.dueDate), "dd/MM/yyyy")}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full border-indigo-200 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
              >
                <MoreHorizontal
                  className="h-4 w-4 text-indigo-600"
                  strokeWidth={1.5}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 p-2 rounded-xl border border-indigo-100 shadow-lg bg-white/95 backdrop-blur-md"
            >
              <DropdownMenuLabel className="text-xs font-normal text-gray-500">
                Ações
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => handleEditBill(bill)}
                  className="gap-2 text-sm rounded-md data-[highlighted]:bg-indigo-50 data-[highlighted]:text-indigo-600 cursor-pointer transition-colors duration-200"
                >
                  <Pencil className="h-4 w-4" strokeWidth={1.5} />
                  <span>Editar despesa</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDeleteBill(bill)}
                  className="gap-2 text-sm rounded-md text-red-600 data-[highlighted]:bg-red-50 data-[highlighted]:text-red-700 cursor-pointer transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  <span>Excluir despesa</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              {bill.status !== StatusEnum.Paid &&
                bill.status !== StatusEnum.Pending && (
                  <>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuLabel className="text-xs font-normal text-gray-500">
                      Status
                    </DropdownMenuLabel>
                  </>
                )}
              <DropdownMenuGroup className="mt-1">
                {bill.status !== StatusEnum.Paid && (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleUpdateStatus(bill, StatusEnum.Paid)}
                      className="gap-2 text-sm rounded-md text-emerald-600 data-[highlighted]:bg-emerald-50 data-[highlighted]:text-emerald-700 cursor-pointer transition-colors duration-200"
                    >
                      <Check className="h-4 w-4" strokeWidth={1.5} />
                      <span>
                        Marcar como{" "}
                        {translateStatus(StatusEnum.Paid).toLowerCase()}
                      </span>
                    </DropdownMenuItem>
                    {bill.status !== StatusEnum.Expired && (
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateStatus(bill, StatusEnum.Expired)
                        }
                        className="gap-2 text-sm rounded-md text-red-600 data-[highlighted]:bg-red-50 data-[highlighted]:text-red-700 cursor-pointer transition-colors duration-200"
                      >
                        <ShieldAlert className="h-4 w-4" strokeWidth={1.5} />
                        <span>
                          Marcar como{" "}
                          {translateStatus(StatusEnum.Expired).toLowerCase()}
                        </span>
                      </DropdownMenuItem>
                    )}
                  </>
                )}
                {bill.status !== StatusEnum.Paid &&
                  bill.status !== StatusEnum.Pending && (
                    <DropdownMenuItem
                      onClick={() =>
                        handleUpdateStatus(bill, StatusEnum.Pending)
                      }
                      className="gap-2 text-sm rounded-md text-yellow-600 data-[highlighted]:bg-yellow-50 data-[highlighted]:text-yellow-700 cursor-pointer transition-colors duration-200"
                    >
                      <Timer className="h-4 w-4" strokeWidth={1.5} />
                      <span>
                        Marcar como{" "}
                        {translateStatus(StatusEnum.Pending).toLowerCase()}
                      </span>
                    </DropdownMenuItem>
                  )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
