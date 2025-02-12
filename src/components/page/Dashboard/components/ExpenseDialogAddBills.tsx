import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomDatePicker } from "@/components/ui/form/CustomDatePicker";
import { CustomInput } from "@/components/ui/form/CustomInput";
import { CustomSelect } from "@/components/ui/form/CustomSelect";
import { categoryList, statusList } from "@/lib/entities/bills/enum";
import { CreateBillsFormSchema } from "@/lib/validation/create-bills";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const ExpenseDialogAddBills = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof CreateBillsFormSchema>>({
    resolver: zodResolver(CreateBillsFormSchema),
    mode: "all",
  });

  const statusListFormated = statusList.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  );

  const categoryListFormated = categoryList.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  );

  const handleCreateBill = (data: CreateBillFormType) => console.log(data);

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(handleCreateBill)}>
        <DialogHeader className="flex items-start">
          <DialogTitle>Create bills</DialogTitle>
          <DialogDescription>
            Add your expenses to keep track of your finances
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col gap-4">
          <Controller
            control={control}
            name="dueDate"
            render={(field) => (
              <CustomDatePicker
                label="Due Date"
                field={field.field}
                error={errors.dueDate}
              />
            )}
          />
          <CustomInput
            {...register("description")}
            label="Description"
            placeholder="Description"
            name="description"
            error={errors.description}
          />

          <CustomInput
            {...register("amount")}
            masks="number"
            prefix="R$"
            label="Amount"
            placeholder="1000"
            name="amount"
            error={errors.amount}
          />
          <Controller
            control={control}
            name="status"
            render={(field) => (
              <CustomSelect
                field={field.field}
                list={statusListFormated}
                label="Status"
                placeholder="Select status"
                error={errors.status}
              />
            )}
          />
          <Controller
            control={control}
            name="category"
            render={(field) => (
              <CustomSelect
                field={field.field}
                list={categoryListFormated}
                label="Category"
                placeholder="Select category"
                error={errors.category}
              />
            )}
          />
          <Button disabled={!isValid} className="mt-6" type="submit">
            Create bill
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
