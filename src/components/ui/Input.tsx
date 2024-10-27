import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: FieldError | undefined;
  as?: "input" | "textarea";
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ label, error, as = "input", ...props }, ref) => {
  const InputComponent = as === "textarea" ? "textarea" : "input";

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <InputComponent
        ref={ref as any}
        className="w-full p-3 bg-white rounded-md border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
});

Input.displayName = "Input";
