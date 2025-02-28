"use client";
import { useToast } from "@/hooks/use-toast";
import { SignupFormSchema } from "@/lib/validation/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/form/CustomInput";
import { Icons } from "@/components/ui/icon";
import { useRegister } from "@/hooks/api/auth/useRegister";
import { WhatsappService } from "@/lib/service";
import { ArrowLeft, Mail, PhoneCall, Sticker } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type SignupFormProps = {
  onChangeTab: (val: string) => void;
};

export function SignupForm({ onChangeTab }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    mode: "all",
  });
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync, isPending } = useRegister();

  const handleCreateUser = async (dataForm: SignupFormType) => {
    try {
      const payload = {
        name: dataForm.name,
        email: dataForm.email,
        phone: dataForm.phone.replaceAll(/\D/g, ""),
        password: dataForm.password,
      };

      await mutateAsync(payload);

      toast({
        description: "User created successfully",
        className: "bg-green-500 text-white",
      });

      const signInRes = await signIn("credentials", {
        name: dataForm.name,
        email: dataForm.email,
        phone: dataForm.phone,
        password: dataForm.password,
        redirect: false,
      });

      if (signInRes?.ok) {
        await WhatsappService.sendWhatsAppIniialMessage(dataForm.phone);
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast({
        className: "bg-red-500 text-white",
        description: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateUser)} className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChangeTab("signin")}
            className="text-indigo-600 hover:text-indigo-500 focus:outline-none transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            Criar conta
          </h3>
        </div>
        <p className="text-sm text-gray-500">
          Preencha os dados abaixo para começar
        </p>
      </div>

      <div className="space-y-4">
        <CustomInput
          {...register("name")}
          label="Nome"
          placeholder="Seu nome completo"
          name="name"
          error={errors.name}
          icon={<Sticker size={16} className="text-indigo-600" />}
        />
        <CustomInput
          {...register("phone")}
          masks="number"
          typeMask="phone"
          label="WhatsApp"
          placeholder="(61) 99999-9999"
          name="phone"
          error={errors.phone}
          icon={<PhoneCall size={16} className="text-indigo-600" />}
        />
        <CustomInput
          {...register("email")}
          label="Email"
          placeholder="seu@email.com"
          name="email"
          error={errors.email}
          icon={<Mail size={16} className="text-indigo-600" />}
        />
        <CustomInput
          {...register("password")}
          type="password"
          label="Senha"
          placeholder="••••••••"
          name="password"
          error={errors.password}
        />

        <Button
          disabled={!isValid}
          isLoading={isPending}
          type="submit"
          className="w-full py-2.5 px-4 text-sm font-semibold tracking-wide text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors rounded-lg"
        >
          Criar conta
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white">ou continue com</span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          variant="outline"
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border border-gray-300 rounded-lg transition-colors"
        >
          <Icons.google className="h-5 w-5" />
          <span>Google</span>
        </Button>
      </div>
    </form>
  );
}
