import { forwardRef } from "react";

interface GenderRadioProps {
  id: string;
  label: string;
  value: "male" | "female";
}

const GenderRadio = forwardRef<HTMLInputElement, GenderRadioProps>(function GenderRadio(
  { id, label, value, ...rest },
  ref
) {
  return (
    <div className="flex-1">
      <input className="peer sr-only" type="radio" id={id} value={value} {...rest} ref={ref} />
      <label
        className="block w-full py-3.5 border border-[#E9E9ED] rounded-xl peer-checked:border-[#161616] cursor-pointer text-center text-sm text-[#161616] font-medium"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
});

export default GenderRadio;
