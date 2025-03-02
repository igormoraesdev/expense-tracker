import { Logo } from "@/components/Logo";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

interface NavigationProps {
  scrollToSection: (sectionRef: React.RefObject<HTMLDivElement | null>) => void;
  inicioRef: React.RefObject<HTMLDivElement | null>;
  recursosRef: React.RefObject<HTMLDivElement | null>;
  planosRef: React.RefObject<HTMLDivElement | null>;
}

export const Navigation: React.FC<NavigationProps> = ({
  scrollToSection,
  inicioRef,
  recursosRef,
  planosRef,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: -10,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-md bg-slate-950/60 border-b border-indigo-500/20"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Logo color="#ffffff" />
          <nav className="hidden md:flex items-center space-x-8">
            <motion.a
              onClick={() => scrollToSection(inicioRef)}
              className="text-indigo-200 hover:text-white transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Início
            </motion.a>
            <motion.a
              onClick={() => scrollToSection(recursosRef)}
              className="text-indigo-200 hover:text-white transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Recursos
            </motion.a>
            <motion.a
              onClick={() => scrollToSection(planosRef)}
              className="text-indigo-200 hover:text-white transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Planos
            </motion.a>
          </nav>
          <div className="hidden md:block">
            <Link href="/auth">
              <motion.button
                className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-100 px-4 py-2 rounded-lg border border-indigo-400/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Link>
          </div>
          <motion.button
            className="md:hidden text-indigo-200 hover:text-white relative w-8 h-8"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="absolute top-3 left-0 w-8 h-0.5 bg-indigo-200 rounded-full"
              animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute top-5 left-0 w-8 h-0.5 bg-indigo-200 rounded-full"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute top-7 left-0 w-8 h-0.5 bg-indigo-200 rounded-full"
              animate={
                isMenuOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-[60px] left-0 right-0 bg-slate-950/95 backdrop-blur-md border-b border-indigo-500/20 z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container mx-auto px-4 py-6">
              <motion.nav
                className="flex flex-col space-y-4"
                variants={menuVariants}
              >
                <motion.a
                  onClick={() => {
                    scrollToSection(inicioRef);
                    setIsMenuOpen(false);
                  }}
                  className="text-indigo-200 hover:text-white transition-colors cursor-pointer py-2 px-4 rounded-lg hover:bg-indigo-500/10"
                  variants={menuItemVariants}
                  whileTap={{ scale: 0.95 }}
                >
                  Início
                </motion.a>
                <motion.a
                  onClick={() => {
                    scrollToSection(recursosRef);
                    setIsMenuOpen(false);
                  }}
                  className="text-indigo-200 hover:text-white transition-colors cursor-pointer py-2 px-4 rounded-lg hover:bg-indigo-500/10"
                  variants={menuItemVariants}
                  whileTap={{ scale: 0.95 }}
                >
                  Recursos
                </motion.a>
                <motion.a
                  onClick={() => {
                    scrollToSection(planosRef);
                    setIsMenuOpen(false);
                  }}
                  className="text-indigo-200 hover:text-white transition-colors cursor-pointer py-2 px-4 rounded-lg hover:bg-indigo-500/10"
                  variants={menuItemVariants}
                  whileTap={{ scale: 0.95 }}
                >
                  Planos
                </motion.a>
                <motion.div variants={menuItemVariants} className="pt-2">
                  <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                    <motion.button
                      className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-100 px-4 py-2 rounded-lg border border-indigo-400/30 transition-all"
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
