import { z, ZodType } from "zod";

export const DashboardFormSchema: ZodType<DashboardFormType> = z.object({
  date: z.date(),
});
