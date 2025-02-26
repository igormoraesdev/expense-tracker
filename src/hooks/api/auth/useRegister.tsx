import { AuthService } from "@/lib/service";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useRegister(
  options?: UseMutationOptions<void, unknown, SignupFormType>
) {
  return useMutation({
    mutationFn: async (dataForm: SignupFormType) =>
      await AuthService.registerAccount(dataForm),
    ...options,
  });
}
