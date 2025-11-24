export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <li className="px-1.5 py-0.5  rounded-lg bg-[#F5F6FA] font-medium text-[13px] text-[#767676]">
      {children}
    </li>
  )
}