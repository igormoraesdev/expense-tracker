import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PricingSectionProps {
  planosRef: React.RefObject<HTMLDivElement | null>;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  planosRef,
}) => {
  return (
    <section className="px-4 py-20 relative" id="planos" ref={planosRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-100 to-white mb-6">
          Escolha seu Plano
        </h2>
        <p className="text-indigo-200 text-xl max-w-2xl mx-auto">
          Selecione o plano que melhor se adapta às suas necessidades
          financeiras
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          className="bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-lg rounded-2xl p-8 border border-indigo-200/20 flex flex-col h-full relative overflow-hidden"
        >
          <motion.div
            className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              Plano Gratuito
            </h3>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-4xl font-bold text-white">R$0</span>
              <span className="text-indigo-200 mb-1">/mês</span>
            </div>
            <p className="text-indigo-200/80">
              Perfeito para quem está começando
            </p>
          </div>

          <div className="flex-grow">
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-indigo-100">
                <Check className="text-indigo-400 w-5 h-5" />
                <span>Cadastre até 5 faturas</span>
              </li>
              <li className="flex items-center gap-2 text-indigo-100">
                <Check className="text-indigo-400 w-5 h-5" />
                <span>Resumo financeiro básico</span>
              </li>
              <li className="flex items-center gap-2 text-indigo-300/50">
                <X className="text-indigo-300/50 w-5 h-5" />
                <span>Faturas ilimitadas</span>
              </li>
              <li className="flex items-center gap-2 text-indigo-300/50">
                <X className="text-indigo-300/50 w-5 h-5" />
                <span>Análises avançadas</span>
              </li>
            </ul>
          </div>

          <Link href="/auth">
            <motion.button
              className="w-full bg-indigo-500/20 text-indigo-100 border border-indigo-400/30 py-3 rounded-lg font-medium hover:bg-indigo-500/30 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Começar Grátis
            </motion.button>
          </Link>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          className="bg-gradient-to-b from-indigo-600/30 to-indigo-600/5 backdrop-blur-lg rounded-2xl p-8 border border-indigo-400/30 flex flex-col h-full relative overflow-hidden"
        >
          <div className="absolute -left-6 -top-6 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl" />
          <div className="absolute right-10 bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="absolute top-0 right-0">
            <div className="bg-indigo-500 text-white text-xs py-1 px-3 rounded-bl-lg rounded-tr-lg font-medium">
              RECOMENDADO
            </div>
          </div>

          <div className="mb-6 relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              Plano Premium
            </h3>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-4xl font-bold text-white">R$30</span>
              <span className="text-indigo-200 mb-1">/mês</span>
            </div>
            <p className="text-indigo-200">Controle financeiro completo</p>
          </div>

          <div className="flex-grow relative z-10">
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-indigo-100">
                <Check className="text-indigo-400 w-5 h-5" />
                <span>Faturas ilimitadas</span>
              </li>
              <li className="flex items-center gap-2 text-indigo-100">
                <Check className="text-indigo-400 w-5 h-5" />
                <span>Análises detalhadas</span>
              </li>
              <li className="flex items-center gap-2 text-indigo-100">
                <Check className="text-indigo-400 w-5 h-5" />
                <span>Relatórios personalizados</span>
              </li>
              <li className="flex items-center gap-2 text-indigo-100">
                <Check className="text-indigo-400 w-5 h-5" />
                <span>Suporte prioritário</span>
              </li>
            </ul>
          </div>

          <Link href="/auth">
            <motion.button
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-3 rounded-lg font-medium shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Assinar Premium
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
