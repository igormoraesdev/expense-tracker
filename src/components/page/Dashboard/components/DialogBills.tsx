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
import { translateCategory, translateStatus } from "@/lib/utils";
import { Masks } from "@/lib/utils/masks";
import { CreateBillsFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { BanknoteIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
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
      queryClient.invalidateQueries({ queryKey: ["total-spend"] });
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
        queryClient.invalidateQueries({ queryKey: ["total-spend"] });
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
        toast({
          description: "Despesa atualizada com sucesso",
          className: "bg-green-500 text-white",
          duration: 5000,
        });
      } else {
        await mutateAsync(payload);
        toast({
          description: "Despesa criada com sucesso",
          className: "bg-green-500 text-white",
          duration: 5000,
        });
      }

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

  const title = useMemo(() => {
    if (isEdit) {
      return "Editar despesa";
    }
    return "Nova despesa";
  }, [isEdit]);

  const subtitle = useMemo(() => {
    if (isEdit) {
      return "Atualize os detalhes da sua despesa";
    }
    return "Adicione uma nova despesa ao seu controle financeiro";
  }, [isEdit]);

  const submitButton = useMemo(() => {
    if (isEdit) {
      return "Atualizar despesa";
    }
    return "Adicionar despesa";
  }, [isEdit]);

  const isLoading = isPending || isPendingUpdateBill;

  return (
    <DialogContent className="sm:max-w-[550px] p-0 bg-white/10 backdrop-blur-xl border-indigo-100/20 shadow-lg rounded-md overflow-hidden">
      <div className="px-6 py-4 border-b border-indigo-100/20">
        <DialogHeader className="">
          <DialogTitle className="text-2xl font-bold text-indigo-100">
            {title}
          </DialogTitle>
          <DialogDescription className="text-indigo-400 mt-1">
            {subtitle}
          </DialogDescription>
        </DialogHeader>
      </div>

      <form onSubmit={handleSubmit(handleCreateBill)}>
        <div className="px-6 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <Controller
                control={control}
                name="dueDate"
                render={(field) => (
                  <CustomDatePicker
                    label="Data de vencimento"
                    field={field.field}
                    error={errors.dueDate}
                  />
                )}
              />
            </div>
            <div className="col-span-1">
              <CustomInput
                {...register("amount")}
                masks="number"
                typeMask="currency"
                prefix="R$"
                label="Valor"
                placeholder="Digite o valor"
                name="amount"
                error={errors.amount}
                icon={<BanknoteIcon size={16} className="text-indigo-300" />}
                className="bg-white/10 border-white/20 text-white placeholder:text-indigo-200/60"
              />
            </div>
          </div>

          <div className="space-y-4">
            <CustomInput
              {...register("description")}
              label="Descrição"
              placeholder="Digite a descrição da despesa"
              name="description"
              className="bg-white/10 border-white/20 text-white placeholder:text-indigo-200/60"
              error={errors.description}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <Controller
                  control={control}
                  name="status"
                  render={(field) => (
                    <CustomSelect
                      field={field.field}
                      list={statusList}
                      label="Status"
                      placeholder="Selecione o status"
                      error={errors.status}
                      translateFn={translateStatus}
                    />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Controller
                  control={control}
                  name="category"
                  render={(field) => (
                    <CustomSelect
                      field={field.field}
                      list={categoryList}
                      label="Categoria"
                      placeholder="Selecione a categoria"
                      error={errors.category}
                      translateFn={translateCategory}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-4 border-t border-indigo-100/20">
          <Button
            variant="outline"
            isLoading={isLoading}
            disabled={!isValid}
            className="bg-indigo-700 hover:bg-indigo-600 focus:bg-indigo-600 text-white rounded-full h-10 px-4"
            type="submit"
          >
            {submitButton}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
