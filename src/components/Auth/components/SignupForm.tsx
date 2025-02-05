"use client";
import { useToast } from "@/hooks/use-toast";
import { SignupFormSchema, SignupFormType } from "@/lib/types/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  AiOutlineArrowLeft,
  AiOutlineMail,
  AiOutlineSmile,
} from "react-icons/ai";
import { Button } from "../../ui/button";
import { CustomInput } from "../../ui/form/Input";

type SignupFormProps = {
  onChangeTab: (val: string) => void;
};

export function SignupForm({ onChangeTab }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    mode: "all",
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleCreateUser = async (dataForm: SignupFormType) => {
    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });

      toast({
        description: "User created successfully",
        className: "bg-green-500 text-white",
      });

      const signInRes = await signIn("credentials", {
        name: dataForm.name,
        email: dataForm.email,
        password: dataForm.password,
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
    <form onSubmit={handleSubmit(handleCreateUser)}>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => onChangeTab("signin")}
          className="text-primary font-semibold hover:underline ml-1 whitespace-nowrap"
        >
          <AiOutlineArrowLeft size={24} />
        </button>
        <h3 className="text-gray-800 text-3xl font-extrabold">Register</h3>
      </div>
      <div className="flex flex-col gap-5">
        <CustomInput
          {...register("name")}
          label="Name"
          placeholder="Name"
          name="name"
          error={errors.name}
          icon={<AiOutlineSmile className="text-primary" />}
        />
        <CustomInput
          {...register("email")}
          label="Email"
          placeholder="email@example.com"
          name="email"
          error={errors.email}
          icon={<AiOutlineMail className="text-primary" />}
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
          type="submit"
          className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-primaryfocus:outline-none"
        >
          Create account
        </Button>
      </div>
    </form>
  );
}
