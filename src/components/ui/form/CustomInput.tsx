import { Masks } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
  useState,
} from "react";
import { FieldError } from "react-hook-form";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactElement;
  error?: FieldError;
  masks?: "number";
  typeMask?: "currency" | "phone";
  prefix?: string;
};

const maskCondition = {
  currency: Masks.formatNumber,
  phone: Masks.formatPhoneNumber,
};

export function CustomInput({
  label,
  icon,
  error,
  masks,
  prefix = "",
  typeMask,
  ...rest
}: CustomInputProps) {
  const isPassword = rest.type === "password";

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (masks) {
      event.target.value = maskCondition[
        typeMask as keyof typeof maskCondition
      ](event.target.value, prefix);
    }
    rest.onChange?.(event);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={label} className="text-sm text-indigo-700">
        {label}
      </label>
      <div className="w-full relative flex items-center">
        <input
          id={label}
          {...rest}
          onChange={handleChange}
          className="w-full py-3 rounded-sm bg-background placeholder:text-foreground-faded border border-border-faded transition duration-300 ease focus:outline-none focus:border-indigo-700 pl-4 pr-9 placeholder:text-sm"
          type={showPassword ? "text" : rest.type}
        />
        {icon && (
          <div className="absolute right-3 text-center transition-all disabled:pointer-events-none disabled:opacity-50">
            {icon}
          </div>
        )}
        {isPassword && (
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-center transition-all disabled:pointer-events-none disabled:opacity-50"
            type="button"
          >
            {showPassword ? (
              <Eye size={16} className="w-4 h-4 text-indigo-700" />
            ) : (
              <EyeOff size={16} className="w-4 h-4 text-indigo-700" />
            )}
          </button>
        )}
      </div>
      {error && (
        <span className="mt-4 text-destructive text-xs">{error.message}</span>
      )}
    </div>
  );
}
