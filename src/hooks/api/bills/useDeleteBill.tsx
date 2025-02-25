import { BillsService } from "@/lib/service/bills";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useDeleteBill(
  options?: UseMutationOptions<void, unknown, string>
) {
  return useMutation({
    mutationFn: async (billId: string) => await BillsService.deleteBill(billId),
    ...options,
  });
}
