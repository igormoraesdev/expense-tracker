import { z, ZodType } from "zod";

export const SigninFormSchema: ZodType<SigninFormType> = z.object({
  email: z.string({ required_error: "Campo obrigatório" }).email(),
  password: z.string().min(8, { message: "Senha muito curta" }),
});
