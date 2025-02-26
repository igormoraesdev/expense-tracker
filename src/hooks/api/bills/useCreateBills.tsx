import { BillsService } from "@/lib/service";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useCreateBills(
  options?: UseMutationOptions<Bill, unknown, CreateBillsParam>
) {
  return useMutation({
    mutationFn: async (dataForm: CreateBillsParam) =>
      await BillsService.createBills(dataForm),
    ...options,
  });
}
