import { DialogDescription } from "@radix-ui/react-dialog";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
type DialogFreePlanProps = {
  setOpenDialog: (open: boolean) => void;
};

export function DialogFreePlan({ setOpenDialog }: DialogFreePlanProps) {
  return (
    <DialogContent
      onClose={() => {
        setOpenDialog(false);
      }}
      className="sm:max-w-[550px] p-0 bg-white/10 backdrop-blur-xl border-indigo-100/20 shadow-lg rounded-md overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-indigo-100/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-100 mb-1">
            Seu plano gratuito foi excedido
          </DialogTitle>
          <DialogDescription className="text-indigo-200">
            Você atingiu o limite de despesas do plano gratuito. Para continuar
            adicionando novas despesas e aproveitar todos os recursos da
            plataforma, faça upgrade para o plano premium.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              className="mt-4 w-full font-normal bg-indigo-700 hover:bg-indigo-600 focus:bg-indigo-600 text-white rounded-full h-10 px-4"
            >
              <Link href="/dashboard/plans">Ir para planos</Link>
            </Button>
          </DialogFooter>
        </DialogHeader>
      </div>
    </DialogContent>
  );
}
