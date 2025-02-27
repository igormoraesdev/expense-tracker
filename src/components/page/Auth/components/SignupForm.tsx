"use client";
import { useToast } from "@/hooks/use-toast";
import { SignupFormSchema } from "@/lib/validation/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/form/CustomInput";
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
    <form onSubmit={handleSubmit(handleCreateUser)}>
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onChangeTab("signin")}
            className="text-indigo-700 font-semibold hover:underline ml-1 whitespace-nowrap"
          >
            <ArrowLeft size={24} />
          </button>
          <h3 className="text-gray-800 text-3xl font-extrabold">Register</h3>
        </div>
        <p className="text-sm mt-4 text-gray-800">Create your account</p>
      </div>
      <div className="flex flex-col gap-5">
        <CustomInput
          {...register("name")}
          label="Name"
          placeholder="Name"
          name="name"
          error={errors.name}
          icon={<Sticker size={16} className="text-indigo-700" />}
        />
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
        <CustomInput
          {...register("email")}
          label="Email"
          placeholder="email@example.com"
          name="email"
          error={errors.email}
          icon={<Mail size={16} className="text-indigo-700" />}
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
          className="w-full shadow-xl p-6 text-sm tracking-wide rounded-md text-white bg-indigo-700 focus:outline-none"
        >
          Create account
        </Button>
      </div>
    </form>
  );
}
