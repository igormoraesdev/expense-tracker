import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HeroSectionProps {
  inicioRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ inicioRef }) => {
  const dashboardImages = [
    "dashboard-preview.png",
    "dashboard-preview.png",
    "dashboard-preview.png",
  ];

  return (
    <section
      ref={inicioRef}
      className="min-h-screen py-[6rem] md:py-32 px-4 md:px-10 relative"
      id="inicio"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_100%)]" />

      <div className="text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-100 to-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Transforme suas Finanças
        </motion.h1>

        <motion.p
          className="text-indigo-200 text-xl md:text-2xl max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Gerencie seus gastos de forma inteligente e tome controle da sua vida
          financeira
        </motion.p>
        <Link href="/auth">
          <motion.button
            className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 mx-auto hover:shadow-lg hover:shadow-indigo-500/30 transition-all mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Começar Agora
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
        <motion.div
          className="relative mx-auto max-w-5xl h-[230px] md:h-[500px] rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="absolute bg-gradient-to-t from-indigo-500/20 to-transparent rounded-2xl z-10" />
          {dashboardImages.map((image, index) => (
            <motion.div
              key={`image-${index}`}
              className="absolute"
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [100, 0, 0, -100],
              }}
              transition={{
                duration: 4,
                times: [0, 0.1, 0.9, 1],
                repeat: Infinity,
                repeatDelay: dashboardImages.length * 4 - 4,
                delay: index * 4,
              }}
            >
              <Image
                src={`/images/${image}`}
                alt={`Dashboard Preview ${index + 1}`}
                width={1200}
                height={675}
                className="rounded-2xl shadow-2xl shadow-indigo-500/20 border border-indigo-200/20 w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
