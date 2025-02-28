import { z, ZodType } from "zod";

export const SignupFormSchema: ZodType<SignupFormType> = z
  .object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
    phone: z
      .string({ message: "Phone is required" })
      .regex(/^\(\d{2}\) 9\d{4}-\d{4}$/, {
        message: "Field must be in the phone format (xx) 9xxxx-xxxx",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
