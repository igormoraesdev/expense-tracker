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
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">
      <div className="w-full min-h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex justify-center items-center p-8 lg:p-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden"
          >
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

            <Logo className="mx-auto mb-8" color="#ffffff" />
            <div className="w-full relative z-10">{renderTabs}</div>
          </motion.div>
        </div>

        <div className="hidden lg:flex w-1/2 h-screen items-center justify-center p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent_100%)]" />
          <div className="absolute w-full h-full bg-[url('/images/grid.svg')] opacity-20" />

          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-2xl"
          />

          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-2xl"
          />
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
