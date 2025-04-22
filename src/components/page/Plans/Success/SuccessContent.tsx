"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SuccessContentProps = {
  customerEmail: string;
};
export default function SuccessContent({ customerEmail }: SuccessContentProps) {
  return (
    <div className="container w-full min-h-[70vh] p-8 lg:p-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center"
      >
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-lg overflow-hidden">
          <CardHeader className="space-y-1 text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <CardTitle className="text-3xl font-bold tracking-tight text-center text-indigo-200">
              Pagamento bem-sucedido!
            </CardTitle>
            <CardDescription className="text-md text-center text-white">
              Obrigado pela sua assinatura
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center my-6 px-8 font-medium">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white text-md"
            >
              Um email de confirmação será enviado para{" "}
              <span className="font-bold text-indigo-200">{customerEmail}</span>
              . Se você tiver alguma dúvida, envie um email para{" "}
              <a
                href="mailto:ajuda@expensetracker.com"
                className="font-bold text-indigo-200 hover:underline"
              >
                ajuda@expensetracker.com
              </a>
              .
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-lg  p-5 mt-4"
            >
              <p className="text-xl text-white font-bold">
                Seu acesso à plataforma já está disponível. Você pode começar a
                usar todos os recursos agora mesmo!
              </p>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-center pt-2 pb-6 px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full"
            >
              <Button
                className={cn(
                  "w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all",
                  "flex items-center justify-center gap-2"
                )}
                variant="default"
              >
                <Link
                  href="/dashboard"
                  className="flex items-center w-full justify-center"
                >
                  Ir para o dashboard
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
