export default function GenderRadio({
  id,
  name,
  value,
  label,
}: {
  id: string;
  name: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex-1">
      <input className="peer sr-only" type="radio" id={id} name={name} value={value} />
      <label
        className="block w-full py-3.5 border border-[#E9E9ED] rounded-xl peer-checked:border-[#161616] cursor-pointer text-center text-sm text-[#161616] font-medium"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
