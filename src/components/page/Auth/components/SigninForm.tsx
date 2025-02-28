"use client";

import { useToast } from "@/hooks/use-toast";
import { SigninFormSchema } from "@/lib/validation/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/form/CustomInput";
import { Icons } from "@/components/ui/icon";
import { useSignin } from "@/hooks/api/auth/useSignin";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type SigninFormProps = {
  onChangeTab: (val: string) => void;
};

export function SigninForm({ onChangeTab }: SigninFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninFormType>({
    resolver: zodResolver(SigninFormSchema),
    mode: "all",
  });

  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync, isPending } = useSignin();

  const handleSignin = async (dataForm: SigninFormType) => {
    try {
      const user = await mutateAsync(dataForm);

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
      toast({
        className: "bg-red-500 text-white",
        description: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignin)} className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">
          Bem-vindo de volta
        </h3>
        <p className="text-sm text-gray-500">
          {"Não tem uma conta?"}{" "}
          <button
            type="button"
            onClick={() => onChangeTab("signup")}
            className="text-indigo-600 font-medium hover:text-indigo-500 focus:outline-none focus:underline transition-colors"
          >
            Registre-se aqui
          </button>
        </p>
      </div>

      <div className="space-y-4">
        <CustomInput
          {...register("email")}
          label="Email"
          placeholder="seu@email.com"
          name="email"
          error={errors.email}
          icon={<Mail size={16} className="text-indigo-700" />}
        />
        <CustomInput
          {...register("password")}
          type="password"
          label="Senha"
          placeholder="••••••••"
          name="password"
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-500"
            >
              Lembrar-me
            </label>
          </div>
          <button
            type="button"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
          >
            Esqueceu a senha?
          </button>
        </div>

        <Button
          disabled={!isValid}
          isLoading={isPending}
          type="submit"
          className="w-full py-2.5 px-4 text-sm font-semibold tracking-wide text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors rounded-lg"
        >
          Entrar
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
