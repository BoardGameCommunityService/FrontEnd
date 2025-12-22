// InquiryList.tsx
"use client";

import Inquiry from "@/components/inquiry/Inquiry";
import Image from "next/image";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useState, useEffect } from "react";

interface InquiryType {
  id: number;
  title: string;
  content: string;
  answer: string | null;
  createdAt: string;
}

interface InquiryListProps {
  inquiries: InquiryType[];
  error?: string;
}

export default function InquiryList({ inquiries: initialInquiries, error }: InquiryListProps) {
  const { authFetch } = useAuthFetch();
  const [inquiries, setInquiries] = useState(initialInquiries);

  useEffect(() => {
    // 서버에서 토큰 만료로 실패했으면 클라이언트에서 재시도
    if (error === "TOKEN_EXPIRED") {
      const retry = async () => {
        try {
          const res = await authFetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/inquiries/my`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            const data = await res.json();
            setInquiries(data);
          }
        } catch (error) {
          console.error("재시도 실패:", error);
        }
      };
      retry();
    }
  }, [error, authFetch]);

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
