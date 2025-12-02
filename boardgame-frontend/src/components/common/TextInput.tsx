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
    <div className="text-sm flex flex-col">
      <label htmlFor={name} className={isHidden ? "sr-only" : ""}>
        {label}
      </label>
      <input
        name={name}
        id={name}
        className="my-[12px] p-3 border rounded-xl border-[#E9E9ED] outline-none focus:border-[#161616] [&:not(:placeholder-shown)]:border-[#161616]"
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
