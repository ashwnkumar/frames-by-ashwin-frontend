import React from "react";
import { CircleAlert } from "lucide-react";

const Toggle = ({
  id,
  name,
  label,
  desc,
  checked,
  onChange,
  error,
  disabled = false,
  required = false,
  className = "",
}) => {
  return (
    <div
      className={`${className} flex flex-row items-center justify-between border border-border rounded-lg px-4 py-2 w-full`}
    >
      <div className="flex flex-col items-start justify-center">
        {label && (
          <label htmlFor={id} className="text-md font-medium">
            {label}
            {required && (
              <span className="text-danger text-lg font-medium ml-1">*</span>
            )}
          </label>
        )}
        {desc && <p className="text-sm text-dark/60">{desc}</p>}
      </div>

      <div className="relative flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="sr-only peer"
          />
          <div
            className={`
              w-11 h-6 rounded-full transition-colors duration-200
              peer-focus:ring-2 peer-focus:ring-dark
              ${checked ? "bg-dark" : "bg-border"}
              ${disabled && "opacity-50 cursor-not-allowed"}
            `}
          >
            <div
              className={`
                absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200
                ${checked ? "translate-x-5" : ""}
              `}
            />
          </div>
        </label>

        {error && (
          <CircleAlert
            strokeWidth={1.5}
            stroke="red"
            className="absolute right-[-28px] top-1/2 transform -translate-y-1/2"
          />
        )}
      </div>

      {error && (
        <span className="text-red-500 text-sm font-medium mt-1">{error}</span>
      )}
    </div>
  );
};

export default Toggle;
