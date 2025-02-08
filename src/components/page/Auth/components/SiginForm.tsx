"use client";
import { AiOutlineMail } from "react-icons/ai";

import { useToast } from "@/hooks/use-toast";
import { SigninFormSchema } from "@/lib/validation/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/form/CustomInput";
import { Icons } from "@/components/ui/icon";
import { useSignin } from "@/hooks/api/auth/useSignin";
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
        description: "Signin successfully",
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
    <form onSubmit={handleSubmit(handleSignin)}>
      <div className="mb-8 flex flex-col">
        <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
        <p className="text-sm mt-4 text-gray-800">
          {"Don't have an account"}{" "}
          <a
            onClick={() => onChangeTab("signup")}
            className="cursor-pointer text-indigo-700 font-semibold hover:underline ml-1 whitespace-nowrap"
          >
            Register here
          </a>
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <CustomInput
          {...register("email")}
          label="Email"
          placeholder="email@example.com"
          name="email"
          error={errors.email}
          icon={<AiOutlineMail className="text-indigo-700" />}
        />
        <CustomInput
          {...register("password")}
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          error={errors.password}
        />
        <Button
          disabled={!isValid}
          isLoading={isPending}
          type="submit"
          className=" w-full shadow-xl p-6 text-sm tracking-wide rounded-md text-white bg-indigo-700 focus:outline-none"
        >
          Sign In
        </Button>
      </div>

      <div className="my-4 flex items-center gap-4">
        <hr className="w-full border-gray-300" />
        <p className="text-sm text-gray-800 text-center">or</p>
        <hr className="w-full border-gray-300" />
      </div>

      <div className="space-x-6 flex justify-center">
        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          variant="ghost"
          className="p-5"
        >
          <Icons.google />
          Sign In with Google
        </Button>
      </div>
    </form>
  );
}
