import { BillsService } from "@/lib/service";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useGetAllBills(
  params: AllBillsParams,
  options?: Omit<
    UseQueryOptions<AllBillsResponse, unknown, AllBillsResponse>,
    "queryKey"
  >
) {
  return useQuery({
    queryFn: async () => await BillsService.getAllBills(params),
    queryKey: ["all-bills", params.userId, params.page, params.limit],
    ...options,
  });
}
