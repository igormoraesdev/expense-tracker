import { PlansService } from "@/lib/service/plans";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useGetPlans(
  options?: Omit<UseQueryOptions<Plans[], unknown, Plans[]>, "queryKey">
) {
  return useQuery({
    queryFn: async () => await PlansService.getPlans(),
    queryKey: ["plans"],
    ...options,
  });
}
