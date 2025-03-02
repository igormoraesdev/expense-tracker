import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HeroSectionProps {
  inicioRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ inicioRef }) => {
  return (
    <div className="container mx-auto px-4 py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_100%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 pt-16"
        id="inicio"
        ref={inicioRef}
      >
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
          Gerencie seus gastos de forma inteligente e tome controle da sua vida
          financeira
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
    </div>
  );
};
