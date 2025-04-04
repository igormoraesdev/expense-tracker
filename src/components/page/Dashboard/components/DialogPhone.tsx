import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomInput } from "@/components/ui/form/CustomInput";
import { useUpdateUser } from "@/hooks/api/user/useUpdateUser";
import { useToast } from "@/hooks/use-toast";
import { getUserByEmail } from "@/lib/actions/users";
import { WhatsappService } from "@/lib/service";
import { RegisterPhoneFormSchema } from "@/lib/validation/register-phone";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneCall } from "lucide-react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type DataForm = z.infer<typeof RegisterPhoneFormSchema>;

type DialogPhoneProps = {
  onOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export const DialogPhone = ({ onOpenDialog }: DialogPhoneProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<DataForm>({
    resolver: zodResolver(RegisterPhoneFormSchema),
    mode: "all",
  });
  const { toast } = useToast();
  const session = useSession();
  const { isPending, mutateAsync } = useUpdateUser({
    onSuccess: () => {
      onOpenDialog(false);
    },
  });

  const handleUpdateUser = async (data: DataForm) => {
    try {
      const phone = data.phone.replaceAll(/\D/g, "");
      const payload = {
        userId: session.data?.user.userId as string,
        user: {
          phone,
        },
      };
      await mutateAsync(payload);
      toast({
        description: "Telefone registrado com sucesso",
        className: "bg-green-500 text-white",
        duration: 5000,
      });
      await WhatsappService.sendWhatsAppInitialMessage(phone);
      const user = await getUserByEmail(session.data?.user.email as string);
      session.update({ userId: user?.id, ...user });
    } catch (error: any) {
      toast({
        className: "bg-red-500 text-white",
        description: error.message,
      });
    }
  };

  return (
    <DialogContent className="[&>button]:hidden sm:max-w-[550px] p-0 bg-white/10 backdrop-blur-xl border-indigo-100/20 shadow-lg rounded-md overflow-hidden">
      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="px-6 py-4 border-b border-indigo-100/20"
      >
        <DialogHeader className="flex items-start">
          <DialogTitle className="text-2xl font-bold text-indigo-100">
            Registrar WhatsApp
          </DialogTitle>
          <DialogDescription className="text-indigo-400 mt-1">
            Registre seu número do WhatsApp para receber notificações sobre suas
            faturas
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col gap-4">
          <CustomInput
            {...register("phone")}
            className="bg-white/10 border-white/20 text-white placeholder:text-indigo-200/60"
            masks="number"
            typeMask="phone"
            label="WhatsApp"
            placeholder="(61) 99999-9999"
            name="phone"
            error={errors.phone}
            icon={<PhoneCall size={16} className="text-indigo-600" />}
          />

          <Button
            variant="outline"
            isLoading={isPending}
            disabled={!isValid}
            className="mt-6 w-full bg-indigo-700 hover:bg-indigo-600 focus:bg-indigo-600 text-white rounded-full h-10 px-4"
            type="submit"
          >
            Registrar número
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
