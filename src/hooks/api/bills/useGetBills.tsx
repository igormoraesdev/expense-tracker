import { BillsService } from "@/lib/service";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useGetBills(
  params: TotalSpendParams,
  options?: Omit<UseQueryOptions<Bill[], unknown, Bill[]>, "queryKey">
) {
  return useQuery({
    queryFn: async () => await BillsService.getBills(params),
    queryKey: ["bills", params.userId, params.date],
    ...options,
  });
}
