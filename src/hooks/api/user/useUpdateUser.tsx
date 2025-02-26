import { UserService } from "@/lib/service";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useUpdateUser(
  options?: UseMutationOptions<User, unknown, UpdateUserParam>
) {
  return useMutation({
    mutationFn: async (param: UpdateUserParam) =>
      await UserService.updateUser(param),
    ...options,
  });
}
