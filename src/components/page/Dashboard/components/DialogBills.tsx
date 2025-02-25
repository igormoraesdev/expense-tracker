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
import { useUpdateBill } from "@/hooks/api/bills/useUpdateBill";
import { useToast } from "@/hooks/use-toast";
import { categoryList, statusList } from "@/lib/entities/bills/enum";
import { Masks } from "@/lib/utils";
import { CreateBillsFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type DialogBillsProps = {
  onOpenDialog: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  bill?: Bill;
};

export const DialogBills = ({
  isEdit = false,
  bill,
  onOpenDialog,
}: DialogBillsProps) => {
  const queryClient = useQueryClient();
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
  const { mutateAsync, isPending } = useCreateBills({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      reset({
        amount: "",
        description: "",
        dueDate: undefined,
        status: "",
        category: "",
      });
    },
  });
  const { mutateAsync: mutateAsyncUpdateBill, isPending: isPendingUpdateBill } =
    useUpdateBill({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bills"] });
        reset({
          amount: "",
          description: "",
          dueDate: undefined,
          status: "",
          category: "",
        });
      },
    });
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

      if (isEdit) {
        const payload = {
          billId: bill?.id as string,
          bill: {
            userId: session.data?.user.userId as string,
            description: data.description,
            dueDate: data.dueDate,
            amount: data.amount.replace(/[^\d,]/g, "").replace(",", "."),
            category: data.category,
            status: data.status,
          },
        };
        await mutateAsyncUpdateBill(payload);
      } else {
        await mutateAsync(payload);
      }

      toast({
        description: "Bill created successfully",
        className: "bg-green-500 text-white",
        duration: 5000,
      });

      onOpenDialog(false);
    } catch (error: any) {
      toast({
        className: "bg-red-500 text-white",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    if (bill) {
      reset({
        amount: Masks.formatNumber(bill.amount, "R$"),
        dueDate: new Date(bill.dueDate),
        description: bill.description,
        status: bill.status,
        category: bill.category,
      });
    }
  }, [bill]);

  const title = isEdit ? "Update bill" : "Create bill";
  const subtitle = isEdit
    ? "Update your bill to keep track of your finances"
    : "Add your expenses to keep track of your finances";
  const submitButton = isEdit ? "Update bill" : "Create bill";

  const isLoading = isPending ?? isPendingUpdateBill;

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(handleCreateBill)}>
        <DialogHeader className="flex items-start">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
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
            isLoading={isLoading}
            disabled={!isValid}
            className="mt-6 min-h-[41px]"
            type="submit"
          >
            {submitButton}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
