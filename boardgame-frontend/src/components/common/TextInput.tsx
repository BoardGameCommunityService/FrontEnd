import { forwardRef } from "react";

interface TextInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  isHidden?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput(
  { name, label, placeholder, isHidden, value, onChange, ...rest }: TextInputProps,
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
        value={value}
        onChange={onChange}
        {...rest}
        ref={ref}
      />
    </div>
  );
}

export default forwardRef(TextInput);
