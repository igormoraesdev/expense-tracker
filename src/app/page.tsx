"use client";

import { Logo } from "@/components/Logo";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Globe, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_100%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Logo className="mx-auto" color="#ffffff" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-100 to-white mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Transforme suas Finanças
          </motion.h1>
          <motion.p
            className="text-indigo-200 text-xl md:text-2xl max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Gerencie seus gastos de forma inteligente e tome controle da sua
            vida financeira
          </motion.p>
          <Link href="/auth">
            <motion.button
              className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 mx-auto hover:shadow-lg hover:shadow-indigo-500/30 transition-all mb-16"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative mx-auto max-w-5xl hidden sm:block"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent rounded-2xl" />
            <Image
              src="/images/dashboard-preview.png"
              width={1200}
              height={675}
              alt="Dashboard Preview"
              className="rounded-2xl shadow-2xl shadow-indigo-500/20 border border-indigo-200/20"
            />
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mt-32 relative z-10"
        >
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-indigo-200/20"
          >
            <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="text-indigo-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-100 mb-2">
              Controle Total
            </h3>
            <p className="text-indigo-200/80">
              Acompanhe todas suas despesas em um só lugar de forma simples e
              intuitiva.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-indigo-200/20"
          >
            <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Globe className="text-indigo-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-100 mb-2">
              Acesso Global
            </h3>
            <p className="text-indigo-200/80">
              Acesse suas informações de qualquer lugar, a qualquer momento.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-indigo-200/20"
          >
            <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-indigo-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-100 mb-2">
              Análise Rápida
            </h3>
            <p className="text-indigo-200/80">
              Relatórios e insights instantâneos sobre seus gastos e economia.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
