"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { SigninForm } from "./components/SigninForm";
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
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            <Image
              className="flex justify-self-center mb-8"
              src="/images/logo.svg"
              alt="Logo"
              width={162}
              height={50}
            />
            <div className="w-full">{renderTabs}</div>
          </div>
        </div>

        {/* Right side - Image/Pattern */}
        <div className="hidden lg:flex w-1/2 h-screen bg-indigo-700 items-center justify-center p-16">
          <div className="max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Controle suas finanças com facilidade
            </h2>
            <p className="text-indigo-100 text-lg">
              Gerencie suas despesas, acompanhe seus gastos e alcance seus
              objetivos financeiros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
