"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/form/CustomInput";
import { Icons } from "@/components/ui/icon";
import { useSignin } from "@/hooks/api/auth/useSignin";
import { SigninFormSchema } from "@/lib/validation";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

type SigninFormData = z.infer<typeof SigninFormSchema>;

type SigninFormProps = {
  onChangeTab: (tab: string) => void;
};

export function SigninForm({ onChangeTab }: SigninFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SigninFormData>({
    resolver: zodResolver(SigninFormSchema),
    mode: "onChange",
  });

  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync, isPending } = useSignin();

  const handleSignin = async (data: SigninFormData) => {
    try {
      const user = await mutateAsync(data);

      toast({
        description: "Login efetuado com sucesso",
        className: "bg-green-500 text-white",
      });

      const signInRes = await signIn("credentials", {
        name: user.name,
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (signInRes?.ok) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (error.response.data.message === "User not found") {
        setError(
          "email",
          { message: "Usuário não encontrado" },
          {
            shouldFocus: true,
          }
        );
      } else {
        toast({
          className: "bg-red-500 text-white",
          description: "Usuário não encontrado",
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Bem-vindo de volta!
        </h2>
        <p className="text-indigo-200">Entre com sua conta para continuar</p>
      </div>

      <form onSubmit={handleSubmit(handleSignin)} className="space-y-6">
        <CustomInput
          {...register("email")}
          label="Email"
          placeholder="seu@email.com"
          name="email"
          error={errors.email}
          icon={<Mail size={16} className="text-indigo-300" />}
          className="bg-white/10 border-white/20 text-white placeholder:text-indigo-200/60"
        />
        <CustomInput
          {...register("password")}
          type="password"
          label="Senha"
          placeholder="••••••••"
          name="password"
          error={errors.password}
          className="bg-white/10 border-white/20 text-white placeholder:text-indigo-200/60"
        />

        <Button
          isLoading={isPending}
          loadingColor="text-white"
          variant="outline"
          type="submit"
          disabled={!isValid}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-6 px-4 rounded-lg font-medium hover:from-indigo-500 hover:to-indigo-600 focus:ring-2 focus:ring-indigo-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-none shadow-[0_4px_12px_rgba(67,56,202,0.3)]"
        >
          Entrar
        </Button>

        <p className="text-center text-indigo-200 text-sm">
          Não tem uma conta?{" "}
          <button
            type="button"
            onClick={() => onChangeTab("signup")}
            className="text-indigo-300 hover:text-white font-medium transition-colors"
          >
            Criar conta
          </button>
        </p>
      </form>

      <div className="relative mt-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-indigo-500/20" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-indigo-200 bg-transparent">
            ou continue com
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          variant="outline"
          className="max-w-[130px] h-[48px] w-full flex items-center justify-center gap-3 px-4 py-4 text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border border-white/20 rounded-lg transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <Icons.google className="h-5 w-5" />
          <span>Google</span>
        </Button>
      </div>
    </motion.div>
  );
}
