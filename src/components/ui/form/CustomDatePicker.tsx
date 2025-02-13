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
  const [date, setDate] = React.useState<Date>(new Date());
  const [isOpen, setisOpen] = React.useState(false);

  const handleSelectDate = (date: Date | undefined) => {
    setisOpen(false);
    setDate(date as Date);
    field?.onChange(date);
  };

  useEffect(() => {
    setDate(date);
    field?.onChange(date);
  }, []);

  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-sm text-indigo-700">{label}</label>
      <Popover open={isOpen} onOpenChange={setisOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[248px] h-[41px] p-2 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {isMonth ? (
              <>
                {date ? (
                  `${format(date, "MMMM")} - ${format(date, "yyyy")}`
                ) : (
                  <span>Pick a date</span>
                )}
              </>
            ) : (
              <>{date ? format(date, "PPP") : <span>Pick a date</span>}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field?.value || date}
            onSelect={handleSelectDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && (
        <span className="mt-4 text-destructive text-xs">{error.message}</span>
      )}
    </div>
  );
};
