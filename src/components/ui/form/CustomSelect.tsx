import { ControllerRenderProps, FieldError } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

type CustomSelectProps = {
  label: string;
  placeholder: string;
  list: string[];
  field?: Pick<ControllerRenderProps, "onChange" | "value">;
  error?: FieldError;
  translateFn?: (value: any) => string;
};

export const CustomSelect = ({
  label,
  placeholder,
  list,
  field,
  error,
  translateFn,
}: CustomSelectProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-sm text-indigo-200">{label}</label>
      <Select onValueChange={field?.onChange} defaultValue={field?.value}>
        <SelectTrigger className="w-full bg-white/10 border-white/20 text-white placeholder:text-indigo-200/60 min-h-[56px] h-full">
          <SelectValue className="text-indigo-200" placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-indigo-950/50 backdrop-blur-xl border border-white/20 shadow-lg rounded-md">
          <SelectGroup>
            {list?.map((item) => (
              <SelectItem className="text-white" key={item} value={item}>
                {translateFn ? translateFn(item) : item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && (
        <span className="mt-4 text-destructive text-xs">{error.message}</span>
      )}
    </div>
  );
};
