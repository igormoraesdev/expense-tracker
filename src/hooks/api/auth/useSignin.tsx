import { AuthService } from "@/lib/service/auth";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useSignin(
  options?: UseMutationOptions<ResponseSignin, unknown, SigninFormType>
) {
  return useMutation({
    mutationFn: async (dataForm: SigninFormType) =>
      await AuthService.signinAccount(dataForm),
    ...options,
  });
}
