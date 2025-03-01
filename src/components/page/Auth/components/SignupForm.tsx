"use client";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/form/CustomInput";
import { useRegister } from "@/hooks/api/auth/useRegister";
import { WhatsappService } from "@/lib/service";
import { SignupFormSchema } from "@/lib/validation/signup";
import { Mail, PhoneCall, Sticker } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type SignupFormData = z.infer<typeof SignupFormSchema>;

type SignupFormProps = {
  onChangeTab: (tab: string) => void;
};

export function SignupForm({ onChangeTab }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupFormSchema),
    mode: "onChange",
  });
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync, isPending } = useRegister();

  const handleCreateUser = async (data: SignupFormData) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone.replaceAll(/\D/g, ""),
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      await mutateAsync(payload);

      toast({
        description: "Usuário criado com sucesso",
        className: "bg-green-500 text-white",
      });

      const signInRes = await signIn("credentials", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        redirect: false,
      });

      if (signInRes?.ok) {
        await WhatsappService.sendWhatsAppInitialMessage(data.phone);
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
    <form onSubmit={handleSubmit(handleCreateUser)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Crie sua conta
          </h2>
          <p className="text-slate-600">
            Comece a controlar suas finanças hoje mesmo
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
          <CustomInput
            {...register("confirmPassword")}
            type="password"
            label="Confirmar Senha"
            placeholder="••••••••"
            name="confirmPassword"
            error={errors.confirmPassword}
          />
          <Button
            isLoading={isPending}
            loadingColor="text-white"
            variant="outline"
            type="submit"
            disabled={!isValid}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-6 px-4 rounded-lg font-medium hover:from-indigo-500 hover:to-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Criar conta
          </Button>

          <p className="text-center text-slate-600 text-sm">
            Já tem uma conta?{" "}
            <button
              type="button"
              onClick={() => onChangeTab("signin")}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Fazer login
            </button>
          </p>
        </div>
      </motion.div>
    </form>
  );
}
