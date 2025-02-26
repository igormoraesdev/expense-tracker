import { BillsService } from "@/lib/service";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useUpdateBill(
  options?: UseMutationOptions<Bill, unknown, UpdateBillParam>
) {
  return useMutation({
    mutationFn: async (param: UpdateBillParam) =>
      await BillsService.updateBill(param),
    ...options,
  });
}
