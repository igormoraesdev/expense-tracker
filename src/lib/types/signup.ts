import { z, ZodType } from "zod"; // Add new import

export type SignupFormType = {
  name: string;
  email: string;
  password: string;
};

export const SignupFormSchema: ZodType<SignupFormType> = z.object({
  name: z.string().min(3, { message: "Name is too short" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password is too short" }),
});
