interface TextInputProps {
  title: string;
  name: string;
  placeholder?: string;
}
export default function TextInput({ title,name, placeholder }: TextInputProps){
  return (

      <div className="my-[40px] text-[14px]">
        <label htmlFor={name}>{title}</label>
        <input name={name} id={name} className=" w-full mt-[12px] p-3 border rounded-xl border-[#161616]" placeholder={`${title}을 입력해주세요${placeholder || ''}`} type="text" maxLength={10} />
      </div>
  )
}
