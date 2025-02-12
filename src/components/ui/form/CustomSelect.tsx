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
};

export const CustomSelect = ({
  label,
  placeholder,
  list,
  field,
  error,
}: CustomSelectProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-sm text-indigo-700">{label}</label>
      <Select onValueChange={field?.onChange} defaultValue={field?.value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {list?.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
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
