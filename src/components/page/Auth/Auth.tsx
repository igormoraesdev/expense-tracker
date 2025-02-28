"use client";
import { Logo } from "@/components/Logo";
import { motion } from "framer-motion";
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
    <div className="w-full min-h-screen bg-white">
      <div className="w-full min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 flex justify-center items-center p-8 lg:p-16 bg-white"
        >
          <div className="w-full max-w-md">
            <Logo className="mx-auto mb-8" color="#4F46E5" />
            <div className="w-full">{renderTabs}</div>
          </div>
        </motion.div>

        {/* Right side - Image/Pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex w-1/2 h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 items-center justify-center p-16 relative overflow-hidden"
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_100%)]" />

          {/* Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl text-center relative z-10"
          >
            <motion.h2
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-100 to-white mb-6"
            >
              Controle suas finanças com facilidade
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-indigo-200 text-lg"
            >
              Gerencie suas despesas, acompanhe seus gastos e alcance seus
              objetivos financeiros.
            </motion.p>

            {/* Decorative circles */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
