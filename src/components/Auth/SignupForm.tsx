"use client";
import {
  AiOutlineArrowLeft,
  AiOutlineMail,
  AiOutlineSmile,
} from "react-icons/ai";

import { CustomInput } from "../form/Input";
import { Button } from "../ui/button";

type SignupFormProps = {
  onChangeTab: (val: string) => void;
};

export function SignupForm({ onChangeTab }: SignupFormProps) {
  return (
    <form>
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
          label="Name"
          placeholder="Name"
          icon={<AiOutlineSmile className="text-primary" />}
        />
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
          Create account
        </Button>
      </div>
    </form>
  );
}
