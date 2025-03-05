"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React, { useEffect } from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";

type CustomDatePickerProps = {
  label?: string;
  error?: FieldError;
  field?: Pick<ControllerRenderProps, "onChange" | "value">;
  isMonth?: boolean;
};

export const CustomDatePicker = ({
  label,
  field,
  error,
  isMonth = false,
}: CustomDatePickerProps) => {
  const [date, setDate] = React.useState<Date>(field?.value || new Date());
  const [isOpen, setisOpen] = React.useState(false);

  const handleSelectDate = (date: Date | undefined) => {
    setisOpen(false);
    setDate(date as Date);
    field?.onChange(date);
  };

  useEffect(() => {
    field?.onChange(date);
  }, []);

  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-sm text-indigo-200">{label}</label>
      <Popover open={isOpen} onOpenChange={setisOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "rounded-full w-[248px] h-[56px] p-4 text-left font-normal relative group gap-1 justify-start",
              "bg-indigo-700 backdrop-blur-xl border border-indigo-200 text-white hover:bg-indigo-600 focus:bg-indigo-600"
            )}
          >
            <CalendarIcon className="w-4 h-4 text-indigo-300 mr-2" />
            <span className="text-white">
              {isMonth ? (
                <>
                  {date
                    ? `${format(date, "MMMM", { locale: ptBR })} - ${format(
                        date,
                        "yyyy"
                      )}`
                    : "Selecione uma data"}
                </>
              ) : (
                <>
                  {date
                    ? format(date, "dd/MM/yyyy", { locale: ptBR })
                    : "Selecione uma data"}
                </>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 z-[51] overflow-hidden border-2 border-white/20"
          align="start"
        >
          <Calendar
            className="p-4 bg-indigo-700 backdrop-blur-xl shadow-lg rounded-md"
            mode="single"
            selected={date}
            onSelect={handleSelectDate}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <span className="mt-4 text-destructive text-xs">{error.message}</span>
      )}
    </div>
  );
};
