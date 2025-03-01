import { BillsService } from "@/lib/service";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useCreateBillsByLastMonth(
  options?: UseMutationOptions<Bill[], unknown, { date: Date; userId: string }>
) {
  return useMutation({
    mutationFn: async ({ date, userId }: { date: Date; userId: string }) =>
      await BillsService.createBillsByLastMonth(date, userId),
    ...options,
  });
}
