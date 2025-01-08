import React from "react";
import * as Switch from "@radix-ui/react-switch";

const Toggle = ({
  label,
  name,
  required = false,
  onChange,
  onboardingData,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <Switch.Root
        className="w-[42px] h-[25px] bg-gray-300 rounded-full relative data-[state=checked]:bg-primary outline-none cursor-pointer"
        id={name}
        name={name}
        checked={onboardingData?.[name] || false}
        onCheckedChange={(checked) =>
          onChange({ target: { name, checked } }, "checkbox")
        }
      >
        <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
      <label className="text-sm" htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
};

export default Toggle;
