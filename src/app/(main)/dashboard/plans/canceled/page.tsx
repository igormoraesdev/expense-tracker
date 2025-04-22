"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, Ban } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function CanceledPayment({
  searchParams,
}: {
  searchParams: Promise<{ canceled: string }>;
}) {
  const { canceled } = use(searchParams);

  if (canceled) {
    console.log("Pagamento cancelado");
  }
  const router = useRouter();

  return (
    <div className="container flex flex-col mx-auto p-6 gap-10 h-full">
      {/* Header section */}
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-indigo-100">
          Pagamento Cancelado
        </h1>
        <p className="text-indigo-200/80 max-w-2xl mx-auto">
          Seu pagamento foi cancelado. Se precisar de ajuda, entre em contato
          com nosso suporte.
        </p>
      </div>

      {/* Cancellation card */}
      <Card className="max-w-2xl mx-auto border-indigo-300/20 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-700"></div>

        <CardHeader className="relative z-10 pb-2">
          <div className="mb-4 flex items-center justify-center">
            <div className="rounded-full p-4 bg-red-500/20">
              <Ban className="h-10 w-10 text-red-400" />
            </div>
          </div>
          <CardTitle className="text-2xl text-white text-center">
            Pagamento não processado
          </CardTitle>
          <CardDescription className="text-indigo-200/70 text-center mt-2">
            O processo de pagamento foi interrompido ou cancelado
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="h-6 w-6 text-amber-400 flex-shrink-0" />
            <p className="text-sm text-indigo-100">
              Nenhum valor foi cobrado do seu cartão. Você pode tentar novamente
              quando estiver pronto.
            </p>
          </div>

          <div className="space-y-4 text-indigo-100/80 text-sm">
            <p>Possíveis razões para o cancelamento:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>O pagamento foi cancelado voluntariamente</li>
              <li>Houve um problema com o método de pagamento</li>
              <li>A conexão foi interrompida durante o processamento</li>
              <li>O tempo para conclusão da transação expirou</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="relative z-10 pt-4 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => router.push("/dashboard/plans")}
            variant="outline"
            className="w-full sm:w-auto bg-transparent border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Voltar
          </Button>

          <Button className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700">
            <Link href="/dashboard/plans">Tentar novamente</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Support section */}
      <div className="text-center mt-4 text-indigo-200/70 text-sm">
        <p>
          Precisa de ajuda? Entre em contato com nosso{" "}
          <Link href="/support" className="text-indigo-400 hover:underline">
            suporte
          </Link>
        </p>
      </div>
    </div>
  );
}
