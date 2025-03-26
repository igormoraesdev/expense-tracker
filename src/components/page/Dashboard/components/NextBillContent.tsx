import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBills } from "@/hooks/useBills";
import { CategoryEnum, StatusEnum } from "@/lib/entities/bills/enum";
import { cn, formatCurrency, translateStatus } from "@/lib/utils";
import { differenceInDays } from "date-fns";
import {
  Check,
  MoreHorizontal,
  Pencil,
  ShieldAlert,
  Timer,
  Trash2,
} from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";

type NextBillContentProps = {
  bill: Bill;
  onOpenDialog: (open: boolean) => void;
  onSelectBill: (bill: Bill) => void;
};

export const NextBillContent = ({
  bill,
  onOpenDialog,
  onSelectBill,
}: NextBillContentProps) => {
  const { handleUpdateStatus, handleEditBill, handleDeleteBill } = useBills({
    onOpenDialog,
    onSelectBill,
  });

  const formatDate = (date: Date) => {
    const dueDate = new Date(date);
    const today = new Date();
    const diffInDays = differenceInDays(dueDate, today);

    if (diffInDays === 0) {
      return "Vence hoje";
    } else if (diffInDays === 1) {
      return "Vence amanhã";
    } else if (diffInDays > 1) {
      return `Vence em ${diffInDays} dias`;
    } else {
      return `Venceu há ${Math.abs(diffInDays)} dias`;
    }
  };
  return (
    <div
      key={bill.id}
      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
    >
      <div className="flex items-center w-full">
        <div className="max-h-[25px] sm:max-h-10 max-w-[25px] sm:max-w-10 h-[30px] w-[30px] sm:h-10 sm:w-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-5">
          <CategoryBadge
            category={bill.category as CategoryEnum}
            className="size-3 sm:size-6"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center justify-between">
            <p className="font-medium text-white">{bill.description}</p>
            <p className="font-semibold text-indigo-100">
              {formatCurrency(Number(bill.amount))}
            </p>
          </div>
          <p className="text-xs text-indigo-200">
            {formatDate(new Date(bill.dueDate))}
          </p>
          <div className="w-full flex items-center justify-between">
            <Badge
              className={cn(
                "text-xs text-center w-fit",
                bill.status === StatusEnum.Pending &&
                  "bg-yellow-500/20 text-yellow-500",
                bill.status === StatusEnum.Paid &&
                  "bg-green-500/20 text-green-500",
                bill.status === StatusEnum.Expired &&
                  "bg-red-500/20 text-red-500"
              )}
            >
              {translateStatus(bill.status as StatusEnum)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-indigo-900 p-0 border-indigo-500/20 text-indigo-100 hover:bg-indigo-500/50 hover:border-white/30"
                  )}
                >
                  <MoreHorizontal
                    className="h-4 w-4 text-indigo-100"
                    strokeWidth={1.5}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 p-2 rounded-xl bg-indigo-950/20 backdrop-blur-xl border-white/20"
              >
                <DropdownMenuLabel className="text-xs font-normal text-indigo-200">
                  Ações
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2 bg-indigo-200" />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => handleEditBill(bill)}
                    className="gap-2 text-sm rounded-md cursor-pointer"
                  >
                    <Pencil
                      className="h-4 w-4 text-indigo-200"
                      strokeWidth={1.5}
                    />
                    <span>Editar despesa</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteBill(bill)}
                    className="gap-2 text-sm rounded-md "
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    <span>Excluir despesa</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup className="mt-1">
                  {bill.status !== StatusEnum.Paid && (
                    <>
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateStatus(bill, StatusEnum.Paid)
                        }
                        className="gap-2 text-sm rounded-md "
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
                          className="gap-2 text-sm rounded-md"
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
                        className="gap-2 text-sm rounded-md  cursor-pointer transition-colors duration-200"
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
    </div>
  );
};
