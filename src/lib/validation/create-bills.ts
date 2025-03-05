import { z, ZodType } from "zod";
import { CategoryEnum, StatusEnum } from "../entities/bills/enum";

export const CreateBillsFormSchema: ZodType<CreateBillFormType> = z.object({
  description: z
    .string()
    .min(3, { message: "Descrição deve conter pelo menos 3 caracteres" }),
  dueDate: z.date({ required_error: "Campo obrigatório" }),
  amount: z.string({ required_error: "Campo obrigatório" }),
  status: z.nativeEnum(StatusEnum, { required_error: "Campo obrigatório" }),
  category: z.nativeEnum(CategoryEnum, { required_error: "Campo obrigatório" }),
});
