import { forwardRef } from "react";

interface TextInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  isHidden?: boolean;
}

function TextInput(
  { name, label, placeholder, isHidden, ...rest }: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="mt-[40px] text-sm flex flex-col">
      <label htmlFor={name} className={isHidden ? "sr-only" : ""}>
        {label}
      </label>
      <input
        name={name}
        id={name}
        className="my-[12px] p-3 border rounded-xl border-[#161616] outline-none"
        placeholder={placeholder}
        type="text"
        maxLength={10}
        {...rest}
        ref={ref}
      />
    </div>
  );
}

export default forwardRef(TextInput);
