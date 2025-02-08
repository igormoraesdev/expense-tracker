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
import React from "react";

export const CustomDatePicker = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isOpen, setisOpen] = React.useState(false);

  const handleSelectDate = (date: Date | undefined) => {
    setisOpen(false);
    setDate(date);
  };
  return (
    <Popover open={isOpen} onOpenChange={setisOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[248px] p-6 justify-start text-left",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="font-bold">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
