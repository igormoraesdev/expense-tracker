import { motion } from "framer-motion";
import { Check, Globe, Zap } from "lucide-react";
import React from "react";

interface FeaturesSectionProps {
  recursosRef: React.RefObject<HTMLDivElement | null>;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  recursosRef,
}) => {
  return (
    <div
      ref={recursosRef}
      id="recursos"
      className="container mx-auto px-4 py-20 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-32 relative z-10 mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-100 to-white mb-6">
            Recursos Poderosos
          </h2>
          <p className="text-indigo-200 text-xl max-w-2xl mx-auto">
            Ferramentas completas para você gerenciar suas finanças com precisão
            e facilidade
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-indigo-200/20 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-400/5 rounded-full blur-3xl" />
            <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative z-10">
              <Globe className="text-indigo-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-100 mb-2 relative z-10">
              Acesso Global
            </h3>
            <p className="text-indigo-200/80 mb-4 relative z-10">
              Acesse suas informações de qualquer lugar, a qualquer momento, em
              qualquer dispositivo.
            </p>
            <ul className="space-y-2 relative z-10">
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Sincronização em tempo real entre dispositivos</span>
              </li>
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Aplicativo otimizado para desktop e mobile</span>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-indigo-200/20 relative overflow-hidden"
          >
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-400/5 rounded-full blur-3xl" />
            <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative z-10">
              <Zap className="text-indigo-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-100 mb-2 relative z-10">
              Análise Rápida
            </h3>
            <p className="text-indigo-200/80 mb-4 relative z-10">
              Relatórios e insights instantâneos para você tomar as melhores
              decisões financeiras.
            </p>
            <ul className="space-y-2 relative z-10">
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Análises comparativas de gastos mensais</span>
              </li>
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Projeções financeiras baseadas no seu histórico</span>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-indigo-200/20 relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-400/5 rounded-full blur-3xl" />
            <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-indigo-400 w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-indigo-100 mb-2 relative z-10">
              Segurança Avançada
            </h3>
            <p className="text-indigo-200/80 mb-4 relative z-10">
              Seus dados financeiros protegidos com o mais alto padrão de
              segurança.
            </p>
            <ul className="space-y-2 relative z-10">
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Criptografia de ponta a ponta</span>
              </li>
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Autenticação em dois fatores</span>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-indigo-200/20 relative overflow-hidden"
          >
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-400/5 rounded-full blur-3xl" />
            <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-indigo-400 w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-indigo-100 mb-2 relative z-10">
              Metas Financeiras
            </h3>
            <p className="text-indigo-200/80 mb-4 relative z-10">
              Defina objetivos e acompanhe seu progresso para alcançar a
              liberdade financeira.
            </p>
            <ul className="space-y-2 relative z-10">
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Metas personalizáveis com prazos</span>
              </li>
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Visualização do progresso em tempo real</span>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-indigo-200/20 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-400/5 rounded-full blur-3xl" />
            <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-indigo-400 w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-indigo-100 mb-2 relative z-10">
              Lembretes Automáticos
            </h3>
            <p className="text-indigo-200/80 mb-4 relative z-10">
              Nunca mais esqueça de pagar uma conta ou fatura com nossos
              lembretes automáticos.
            </p>
            <ul className="space-y-2 relative z-10">
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Notificações personalizáveis</span>
              </li>
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Sincronização com seu calendário</span>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-indigo-200/20 relative overflow-hidden"
          >
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-400/5 rounded-full blur-3xl" />
            <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-indigo-400 w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-indigo-100 mb-2 relative z-10">
              Suporte Dedicado
            </h3>
            <p className="text-indigo-200/80 mb-4 relative z-10">
              Conte com nossa equipe de suporte para auxiliar em qualquer dúvida
              ou dificuldade.
            </p>
            <ul className="space-y-2 relative z-10">
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Atendimento rápido e personalizado</span>
              </li>
              <li className="flex items-start gap-2 text-indigo-100 text-sm">
                <Check className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Base de conhecimento completa</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
