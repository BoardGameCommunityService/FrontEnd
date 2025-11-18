interface TextInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  isHidden?: boolean;
}
export default function TextInput({ name, label, placeholder, isHidden }: TextInputProps){
  return (

      <div className="mt-[40px] text-sm">
        <label htmlFor={name} className={isHidden ? 'sr-only' :''}>{label}</label>
        <input name={name} id={name} className=" w-full mt-[12px] p-3 border rounded-xl border-[#161616] outline-none" placeholder={placeholder} type="text" maxLength={10} />
      </div>
  )
}
