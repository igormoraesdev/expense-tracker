import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";

import { InputHTMLAttributes, ReactElement, useState } from "react";
import { FieldError } from "react-hook-form";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactElement;
  error?: FieldError;
};

export function CustomInput({ label, icon, error, ...rest }: CustomInputProps) {
  const isPassword = rest.type === "password";
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label className="text-sm text-indigo-700">{label}</label>
      <div className="w-full relative flex items-center">
        <input
          {...rest}
          className="w-full py-2 rounded-sm bg-background placeholder:text-foreground-faded border border-border-faded transition duration-300 ease focus:outline-none focus:border-indigo-700 pl-4 pr-9 placeholder:text-xs"
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
              <AiTwotoneEye className="w-4 h-4 text-indigo-700" />
            ) : (
              <AiTwotoneEyeInvisible className="w-4 h-4 text-indigo-700" />
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
