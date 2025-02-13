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
import { useCreateBills } from "@/hooks/api/bills/useCreateBills";
import { useToast } from "@/hooks/use-toast";
import { categoryList, statusList } from "@/lib/entities/bills/enum";
import { CreateBillsFormSchema } from "@/lib/validation/create-bills";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type ExpenseDialogAddBillsProps = {
  onOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export const ExpenseDialogAddBills = ({
  onOpenDialog,
}: ExpenseDialogAddBillsProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof CreateBillsFormSchema>>({
    resolver: zodResolver(CreateBillsFormSchema),
    mode: "all",
  });
  const session = useSession();
  const { mutateAsync, isPending } = useCreateBills();
  const { toast } = useToast();

  const handleCreateBill = async (data: CreateBillFormType) => {
    try {
      const payload = {
        userId: session.data?.user.userId as string,
        description: data.description,
        dueDate: data.dueDate,
        amount: parseFloat(
          data.amount.replace(/[^\d,]/g, "").replace(",", ".")
        ),
        category: data.category,
        status: data.status,
      };
      await mutateAsync(payload);

      toast({
        description: "Bill created successfully",
        className: "bg-green-500 text-white",
        duration: 5000,
      });
      reset({
        amount: "",
        description: "",
        dueDate: undefined,
        status: "",
        category: "",
      });
      onOpenDialog(false);
    } catch (error: any) {
      toast({
        className: "bg-red-500 text-white",
        description: error.message,
      });
    }
  };

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
                list={statusList}
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
                list={categoryList}
                label="Category"
                placeholder="Select category"
                error={errors.category}
              />
            )}
          />
          <Button
            isLoading={isPending}
            disabled={!isValid}
            className="mt-6 min-h-[41px]"
            type="submit"
          >
            Create bill
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
