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
import { useUpdateBill } from "@/hooks/api/bills/useUpdateBill";
import { useToast } from "@/hooks/use-toast";
import { CategoryEnum, StatusEnum } from "@/lib/entities/bills/enum";
import { format } from "date-fns";
import {
  Check,
  MoreHorizontal,
  Pencil,
  ShieldAlert,
  Timer,
  Trash2,
} from "lucide-react";
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
    <div className="relative overflow-hidden bg-white rounded-xl border border-indigo-100 transition-all duration-300 hover:shadow-lg hover:border-indigo-300">
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-12 translate-y-[-60%] bg-indigo-50/50 rounded-full" />

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={bill.id as string} className="border-none">
          <AccordionTrigger className="flex items-center justify-between py-4 px-6 hover:no-underline hover:bg-indigo-50/30">
            <div className="flex flex-row items-center gap-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <CategoryBadge category={bill.category as CategoryEnum} />
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm font-semibold text-indigo-900 text-left text-wrap max-w-[200px] break-words">
                  {bill.description}
                </p>
                <BillBadge bill={bill} />
              </div>
              <p className="font-bold text-lg text-indigo-900">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(bill.amount))}
              </p>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-6 pb-4">
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-indigo-400">Vencimento:</span>
                  <p className="text-sm text-indigo-900 font-medium">
                    {format(new Date(bill.dueDate), "dd/MM/yyyy")}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
                    >
                      <MoreHorizontal className="h-4 w-4 text-indigo-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2">
                    <DropdownMenuLabel className="text-xs font-normal text-gray-500">
                      Ações
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => handleEditBill(bill)}
                        className="gap-2 text-sm rounded-md data-[highlighted]:bg-indigo-50 data-[highlighted]:text-indigo-600 cursor-pointer"
                      >
                        <Pencil className="h-4 w-4" />
                        <span>Editar despesa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteBill(bill)}
                        className="gap-2 text-sm rounded-md text-red-600 data-[highlighted]:bg-red-50 data-[highlighted]:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
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
                            onClick={() =>
                              handleUpdateStatus(bill, StatusEnum.Paid)
                            }
                            className="gap-2 text-sm rounded-md text-emerald-600 data-[highlighted]:bg-emerald-50 data-[highlighted]:text-emerald-700 cursor-pointer"
                          >
                            <Check className="h-4 w-4" />
                            <span>Marcar como pago</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(bill, StatusEnum.Expired)
                            }
                            className="gap-2 text-sm rounded-md text-red-600 data-[highlighted]:bg-red-50 data-[highlighted]:text-red-700 cursor-pointer"
                          >
                            <ShieldAlert className="h-4 w-4" />
                            <span>Marcar como expirado</span>
                          </DropdownMenuItem>
                        </>
                      )}
                      {bill.status !== StatusEnum.Paid &&
                        bill.status !== StatusEnum.Pending && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(bill, StatusEnum.Pending)
                            }
                            className="gap-2 text-sm rounded-md text-yellow-600 data-[highlighted]:bg-yellow-50 data-[highlighted]:text-yellow-700 cursor-pointer"
                          >
                            <Timer className="h-4 w-4" />
                            <span>Marcar como pendente</span>
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
