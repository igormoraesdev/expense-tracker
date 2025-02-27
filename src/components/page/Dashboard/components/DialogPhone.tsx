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
        description: "Phone register successfully",
        className: "bg-green-500 text-white",
        duration: 5000,
      });
      await WhatsappService.sendWhatsAppIniialMessage(phone);
    } catch (error: any) {
      toast({
        className: "bg-red-500 text-white",
        description: error.message,
      });
    }
  };

  return (
    <DialogContent className="[&>button]:hidden">
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <DialogHeader className="flex items-start">
          <DialogTitle>Register phone</DialogTitle>
          <DialogDescription>
            Register your WhatsApp number to receive notifications about your
            invoices
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col gap-4">
          <CustomInput
            {...register("phone")}
            masks="number"
            typeMask="phone"
            label="Whatsapp"
            placeholder="(61) 99999-9999"
            name="phone"
            error={errors.phone}
            icon={<PhoneCall size={16} className="text-indigo-700" />}
          />

          <Button
            isLoading={isPending}
            disabled={!isValid}
            className="mt-6 min-h-[41px]"
            type="submit"
          >
            Register number
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
