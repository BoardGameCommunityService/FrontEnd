// InquiryList.tsx
"use client";

import Inquiry from "@/components/inquiry/Inquiry";
import Image from "next/image";

interface InquiryType {
  id: number;
  title: string;
  content: string;
  answer: string | null;
  createdAt: string;
}

interface InquiryListProps {
  inquiries: InquiryType[];
}

export default function InquiryList({ inquiries }: InquiryListProps) {
  return (
    <main className="flex-1 overflow-y-auto">
      {/* 문의 내역이 없을 때 */}
      {inquiries.length === 0 ? (
        <section className="flex flex-col items-center justify-center h-[calc(100%-100px)]">
          <Image src="/icons/ic_empty_logo_with_bubble.svg" width={45} height={58} alt="" />
          <p className="mt-6 font-medium text-base text-center text-[#363636]">문의 내역이 없습니다.</p>
        </section>
      ) : (
        /* 문의 내역 */
        <ul>
          {inquiries.map((inquiry) => (
            <Inquiry key={inquiry.id} inquiry={inquiry} />
          ))}
        </ul>
      )}
    </main>
  );
}
