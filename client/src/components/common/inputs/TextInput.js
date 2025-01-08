import React from "react";
import { cn } from "../../../lib/utils";

const TextInput = ({
  label,
  name,
  type = "text",
  required = false,
  textarea = false,
  value,
  onChange,
  error,
  className,
  ...props
}) => {
  const inputClasses = cn(
    "w-full px-4 py-2 text-sm bg-transparent border-b transition-colors",
    error
      ? "border-b border-red-500 focus:border-b-red-500"
      : "border-b border-gray-500 hover:border-b-blue-500 focus:border-b-blue-500 outline-none",
    className
  );

  return (
    <div className="space-y-2 mb-6">
      <label className="text-sm text-gray-600 block mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {textarea ? (
        <textarea
          className={inputClasses}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          rows={4}
          {...props}
        />
      ) : (
        <input
          className={inputClasses}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
