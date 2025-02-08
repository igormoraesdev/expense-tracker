"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { SigninForm } from "./components/SiginForm";
import { SignupForm } from "./components/SignupForm";

export function Auth() {
  const [tab, setTab] = useState("signin");

  const renderTabs = useMemo(() => {
    const condition = {
      signin: <SigninForm onChangeTab={setTab} />,
      signup: <SignupForm onChangeTab={setTab} />,
    };
    return condition[tab as keyof typeof condition];
  }, [tab]);
  return (
    <div className="w-full font-[sans-serif]">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="grid lg:grid-cols-1 items-center gap-4 max-w-lg w-full px-4 py-8 lg:m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <Image
            className="flex justify-self-center mb-4"
            src="/images/logo.svg"
            alt="Logo"
            width={162}
            height={50}
          />
          <div className="w-full h-full px-4">{renderTabs}</div>
        </div>
      </div>
    </div>
  );
}
