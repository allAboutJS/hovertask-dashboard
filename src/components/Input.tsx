import { useState } from "react";
import cn from "../utils/cn";

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; icon?: React.ReactNode; errorMessage?: string }
) {
  const { errorMessage, label, icon, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={rest.id} className="text-sm">
        {label}
      </label>
      {icon ? (
        <div
          className={cn("flex items-center gap-2 border border-zinc-300 bg-zinc-200/50 rounded-lg px-4 py-2 text-sm", {
            "border-primary": isFocused
          })}
        >
          {icon}
          <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
            className="focus:outline-none text-sm flex-1 bg-transparent"
          />
        </div>
      ) : (
        <input
          {...rest}
          className="border border-zinc-300 bg-zinc-200/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-all text-sm"
        />
      )}
      {errorMessage && <small className="text-danger">{errorMessage}</small>}
    </div>
  );
}
