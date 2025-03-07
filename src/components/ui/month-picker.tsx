import {
  add,
  eachMonthOfInterval,
  endOfYear,
  format,
  isEqual,
  isFuture,
  parse,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

function getStartOfCurrentMonth() {
  return startOfMonth(startOfToday());
}

interface MonthPickerProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
}

export default function MonthPicker({
  currentMonth,
  onMonthChange,
}: MonthPickerProps) {
  const [isOpen, setisOpen] = React.useState(false);
  const [currentYear, setCurrentYear] = React.useState(
    currentMonth ? format(currentMonth, "yyyy") : format(new Date(), "yyyy")
  );
  const firstDayCurrentYear = parse(currentYear, "yyyy", new Date());

  const months = eachMonthOfInterval({
    start: firstDayCurrentYear,
    end: endOfYear(firstDayCurrentYear),
  });

  function previousYear() {
    const firstDayNextYear = add(firstDayCurrentYear, { years: -1 });
    setCurrentYear(format(firstDayNextYear, "yyyy"));
  }

  function nextYear() {
    const firstDayNextYear = add(firstDayCurrentYear, { years: 1 });
    setCurrentYear(format(firstDayNextYear, "yyyy", { locale: ptBR }));
  }

  return (
    <Popover open={isOpen} onOpenChange={setisOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "rounded-full w-[248px] h-[56px] p-4 justify-between text-left font-normal relative group",
            "bg-indigo-700 backdrop-blur-xl border border-indigo-200 text-white hover:bg-indigo-600 focus:bg-indigo-600"
          )}
        >
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-white mr-2" />
            {currentMonth ? (
              <span className="flex items-center">
                <span className="text-white">
                  {format(currentMonth, "MMMM", { locale: ptBR })
                    .charAt(0)
                    .toUpperCase() +
                    format(currentMonth, "MMMM", { locale: ptBR }).slice(1)}
                </span>
                <span className="mx-1 text-white">-</span>
                <span className="text-white">
                  {format(currentMonth, "yyyy", { locale: ptBR })}
                </span>
              </span>
            ) : (
              <span className="text-indigo-300">Selecione um mês</span>
            )}
          </div>
          <div className="h-5 w-5 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
            <ChevronDown className="h-3 w-3 text-indigo-200" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="mt-2 w-auto p-0 bg-indigo-950/50 backdrop-blur-xl border-indigo-100/20 shadow-lg rounded-md"
        align="start"
      >
        <div className="p-4 text-white overflow-hidden relative">
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="space-y-4 relative z-10">
            <div className="relative flex items-center justify-center mb-3 pb-2 border-b border-white/20">
              <div
                className="text-sm font-medium text-indigo-200"
                aria-live="polite"
                role="presentation"
                id="month-picker"
              >
                {format(firstDayCurrentYear, "yyyy", { locale: ptBR })}
              </div>
              <div className="flex items-center space-x-1">
                <button
                  name="previous-year"
                  aria-label="Go to previous year"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-indigo-900 p-0 border-indigo-500/20 text-indigo-100 hover:bg-indigo-500/50 hover:border-white/30",
                    "absolute left-1"
                  )}
                  type="button"
                  onClick={previousYear}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  name="next-year"
                  aria-label="Go to next year"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-indigo-900 p-0 border-indigo-500/20 text-indigo-100 hover:bg-indigo-500/50 hover:border-white/30",
                    "absolute right-1 disabled:bg-indigo-500/10 disabled:text-indigo-300/50 disabled:border-white/10"
                  )}
                  type="button"
                  disabled={isFuture(add(firstDayCurrentYear, { years: 1 }))}
                  onClick={nextYear}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div
              className="grid w-full grid-cols-4 gap-2"
              role="grid"
              aria-labelledby="month-picker"
            >
              {months.map((month) => (
                <div
                  key={month.toString()}
                  className="relative text-center"
                  role="presentation"
                >
                  <Button
                    name="month"
                    className={cn(
                      "w-full h-10 rounded-md text-sm font-medium transition-all border-2 border-indigo-500/30",
                      isEqual(month, currentMonth)
                        ? "bg-indigo-700 text-white hover:bg-indigo-700 shadow-md"
                        : "bg-indigo-500/30 text-indigo-100 hover:bg-indigo-700 hover:text-white",
                      !isEqual(month, currentMonth) &&
                        isEqual(month, getStartOfCurrentMonth()) &&
                        "bg-transparent border-2 border-indigo-700 text-white",
                      isFuture(month) && "opacity-40 cursor-not-allowed"
                    )}
                    disabled={isFuture(month)}
                    role="gridcell"
                    tabIndex={isEqual(month, currentMonth) ? 0 : -1}
                    type="button"
                    onClick={() => {
                      onMonthChange(month);
                      setisOpen(false);
                    }}
                  >
                    <time dateTime={format(month, "yyyy-MM-dd")}>
                      {format(month, "MMM", { locale: ptBR })
                        .charAt(0)
                        .toUpperCase() +
                        format(month, "MMM", { locale: ptBR }).slice(1)}
                    </time>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
