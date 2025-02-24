"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, IdCard } from "lucide-react";

export const BillsDueCard = () => {
  return (
    <div className="grid w-full p-6 sm:p-8 border-2 border-gray-200 rounded-md gap-4">
      <div className="flex items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[48px] sm:w-[48px] bg-indigo-100">
            <IdCard className="text-indigo-700" />
          </div>
          <p className="text-sm sm:text-lg font-bold">Cartão de Crédito</p>
        </div>
        <p className="text-lg text-indigo-900 font-medium">R$ 14.348,90</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm sm:text-lg font-light">Due Date:</p>
          <p className="text-sm sm:text-lg text-indigo-900 font-medium">
            25/02/2025
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm sm:text-lg font-light">Status:</p>
          <Badge className="bg-yellow-400">Pending</Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="size-8 rounded-full">
            <Button
              variant="default"
              size={"icon"}
              className="p-1 outline-none justify-self-end"
            >
              <Ellipsis size={20} className="w-[24px] h-[24px]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem className="focus:bg-indigo-100 focus:text-indigo-700">
                Paid
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-indigo-100 focus:text-indigo-700">
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-indigo-100 focus:text-indigo-700">
                Expired
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
