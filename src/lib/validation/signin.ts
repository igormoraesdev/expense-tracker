import { z, ZodType } from "zod";

export const SigninFormSchema: ZodType<SigninFormType> = z.object({
  email: z.string({ required_error: "Field required" }).email(),
  password: z.string().min(8, { message: "Password is too short" }),
});
