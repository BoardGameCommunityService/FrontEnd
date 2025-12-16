"use client";

import Image from "next/image";
import { useState } from "react";

interface InquiryProps {
  id: number;
  title: string;
  content: string;
  answer: string | null;
  createdAt: string;
}

export default function Inquiry({ inquiry }: { inquiry: InquiryProps }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section>
      <button
        className="flex flex-col items-start w-full gap-1 p-5 border-b border-[#F1F1F4] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {inquiry.answer !== null ? (
          <p className="text-[13px] text-[#06E393] font-medium">답변 완료</p>
        ) : (
          <p className="text-[13px] text-[#767676] font-medium">답변 예정</p>
        )}
        <p className="text-[15px] text-[#363636] font-semibold">{inquiry.title}</p>
        <p className="text-xs text-[#767676] font-normal">{inquiry.createdAt}</p>
      </button>
      {isOpen && (
        <div className="bg-[#F5F6FA] p-5 text-sm">
          {/* content */}
          {inquiry.content}
          {/* answer */}
          {inquiry.answer && (
            <div className="mt-6 flex gap-3">
              <figure className="bg-[#EEF0F7] rounded-full w-8 h-8 overflow-hidden grid place-items-center">
                <Image src="/icons/ic_logo_green.svg" width={32} height={32} alt="" />
              </figure>
              <p>{inquiry.answer}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
