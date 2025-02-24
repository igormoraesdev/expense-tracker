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
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button, buttonVariants } from "./button";
import { Popover, PopoverTrigger } from "./popover";

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
    format(currentMonth, "yyyy")
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
    setCurrentYear(format(firstDayNextYear, "yyyy"));
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
            `${format(currentMonth, "MMMM")} - ${format(currentMonth, "yyyy")}`
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-3 bg-white">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="space-y-4 border-2 border-indigo-200 p-4 rounded-lg">
              <div className="relative flex items-center justify-center pt-1">
                <div
                  className="text-sm font-medium"
                  aria-live="polite"
                  role="presentation"
                  id="month-picker"
                >
                  {format(firstDayCurrentYear, "yyyy")}
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
                        "bg-indigo-400 inline-flex h-9 w-16 items-center justify-center rounded-md p-0 text-sm font-normal ring-offset-white transition-colors hover:bg-indigo-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-800",
                        isEqual(month, currentMonth) &&
                          "bg-indigo-700 text-slate-50 hover:bg-indgo-200 hover:text-white focus:bg-indigo-700 focus:text-white dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900",
                        !isEqual(month, currentMonth) &&
                          isEqual(month, getStartOfCurrentMonth()) &&
                          "bg-indigo-900 text-white dark:bg-slate-800 dark:text-slate-50"
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
                        {format(month, "MMM")}
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
