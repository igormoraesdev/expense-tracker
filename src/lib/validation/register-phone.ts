import { z, ZodType } from "zod";

export const RegisterPhoneFormSchema: ZodType<Pick<SignupFormType, "phone">> =
  z.object({
    phone: z
      .string({ message: "Campo obrigatório" })
      .regex(/^\(\d{2}\) 9\d{4}-\d{4}$/, {
        message: "Formato de telefone inválido",
      }),
  });
