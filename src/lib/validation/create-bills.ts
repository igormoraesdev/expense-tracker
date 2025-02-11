import { z, ZodType } from "zod";
import { CategoryEnum, StatusEnum } from "../entities/bills/enum";

export const CreateBillsFormSchema: ZodType<CreateBillFormType> = z.object({
  description: z
    .string()
    .min(6, { message: "Description must be at least 6 characters" }),
  dueDate: z.date({ required_error: "Field required" }),
  amount: z.string({ required_error: "Field required" }),
  status: z.nativeEnum(StatusEnum, { required_error: "Field required" }),
  category: z.nativeEnum(CategoryEnum, { required_error: "Field required" }),
});
