import { StatusEnum } from "@/lib/entities/bills/enum";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteBill } from "./api/bills/useDeleteBill";
import { useUpdateBill } from "./api/bills/useUpdateBill";
import { useToast } from "./use-toast";

type UseBillsProps = {
  onOpenDialog: (open: boolean) => void;
  onSelectBill: (bill: Bill) => void;
};

export const useBills = ({ onOpenDialog, onSelectBill }: UseBillsProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: mutateAsyncUpdate } = useUpdateBill({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      queryClient.invalidateQueries({ queryKey: ["total-spend"] });
      queryClient.invalidateQueries({ queryKey: ["all-bills"] });
    },
  });
  const { mutateAsync: mutateAsyncDelete } = useDeleteBill({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      queryClient.invalidateQueries({ queryKey: ["total-spend"] });
      queryClient.invalidateQueries({ queryKey: ["all-bills"] });
    },
  });

  const handleUpdateStatus = async (bill: Bill, status: StatusEnum) => {
    try {
      const id = bill.id as string;

      await mutateAsyncUpdate({
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
    onSelectBill(bill);
    onOpenDialog(true);
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

  return {
    handleUpdateStatus,
    handleEditBill,
    handleDeleteBill,
  };
};
