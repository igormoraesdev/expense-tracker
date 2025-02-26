import { z, ZodType } from "zod";

export const RegisterPhoneFormSchema: ZodType<Pick<SignupFormType, "phone">> =
  z.object({
    phone: z
      .string({ message: "Phone is required" })
      .regex(/^\(\d{2}\) 9\d{4}-\d{4}$/, {
        message: "Field must be in the phone format (xx) 9xxxx-xxxx",
      }),
  });
