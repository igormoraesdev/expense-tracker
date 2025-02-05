"use client";
import { AiOutlineMail } from "react-icons/ai";

import { login } from "@/lib/actions/auth";
import { CustomInput } from "../form/Input";
import { Button } from "../ui/button";
import { Icons } from "../ui/icon";

type SigninFormProps = {
  onChangeTab: (val: string) => void;
};

export function SigninForm({ onChangeTab }: SigninFormProps) {
  return (
    <form>
      <div className="mb-8">
        <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
        <p className="text-sm mt-4 text-gray-800">
          {"Don't have an account"}{" "}
          <a
            onClick={() => onChangeTab("signup")}
            className="cursor-pointer text-primary font-semibold hover:underline ml-1 whitespace-nowrap"
          >
            Register here
          </a>
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <CustomInput
          label="Email"
          placeholder="email@example.com"
          icon={<AiOutlineMail className="text-primary" />}
        />
        <CustomInput type="password" label="Password" placeholder="Password" />
        <Button
          type="button"
          className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-primaryfocus:outline-none"
        >
          Sign in
        </Button>
      </div>

      <div className="my-4 flex items-center gap-4">
        <hr className="w-full border-gray-300" />
        <p className="text-sm text-gray-800 text-center">or</p>
        <hr className="w-full border-gray-300" />
      </div>

      <div className="space-x-6 flex justify-center">
        <Button onClick={() => login()} variant="ghost" className="p-5">
          <Icons.google />
          Sign In with Google
        </Button>
      </div>
    </form>
  );
}
