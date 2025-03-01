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
import { ChevronLeft, ChevronRight } from "lucide-react";
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
            "w-[248px] h-[41px] p-2 justify-start text-left font-normal"
          )}
        >
          {currentMonth ? (
            `${
              format(currentMonth, "MMMM", { locale: ptBR })
                .charAt(0)
                .toUpperCase() +
              format(currentMonth, "MMMM", { locale: ptBR }).slice(1)
            } - ${format(currentMonth, "yyyy", { locale: ptBR })}`
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 bg-white rounded-md border border-indigo-100 shadow-lg">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="space-y-4 border-2 border-indigo-200 p-4 rounded-lg">
              <div className="relative flex items-center justify-center pt-1">
                <div
                  className="text-sm font-medium"
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
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
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
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      "absolute right-1 disabled:bg-slate-100"
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
                className="grid w-full grid-cols-3 gap-2"
                role="grid"
                aria-labelledby="month-picker"
              >
                {months.map((month) => (
                  <div
                    key={month.toString()}
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md dark:[&:has([aria-selected])]:bg-slate-800"
                    role="presentation"
                  >
                    <Button
                      name="day"
                      className={cn(
                        "bg-indigo-50 text-indigo-700 inline-flex h-9 w-16 items-center justify-center rounded-md p-0 text-sm font-normal transition-colors hover:bg-indigo-100 hover:text-indigo-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100",
                        isEqual(month, currentMonth) &&
                          "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white focus:bg-indigo-700 focus:text-white",
                        !isEqual(month, currentMonth) &&
                          isEqual(month, getStartOfCurrentMonth()) &&
                          "bg-indigo-100 text-indigo-900"
                      )}
                      disabled={isFuture(month)}
                      role="gridcell"
                      tabIndex={-1}
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
