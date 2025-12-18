"use client";

import Inquiry from "@/components/inquiry/Inquiry";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Inquiry {
  id: number;
  title: string;
  content: string;
  answer: string | null;
  createdAt: string;
}

export default function InquiryList() {
  const [inquiries, setInquiries] = useState<Inquiry[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  // 내 문의 목록 API
  const fetchInquiries = async () => {
    if (!session?.user?.accessToken) {
      return;
    }
    try {
      setIsLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/inquiries/my`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`요청 실패: ${response.status}`);
      }

      const data = await response.json();
      return data as Inquiry[];
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries()
      .then((data) => setInquiries(data))
      .catch((err) => console.error(err));
    console.log(inquiries);
  }, []);

  return (
    <main className="flex-1 overflow-y-auto">
      {/* 문의 내역이 없을 때 보여주는 화면 */}
      {inquiries?.length === undefined && (
        <section className="flex flex-col items-center justify-center h-[calc(100%-100px)]">
          <Image src="/icons/ic_empty_logo_with_bubble.svg" width={45} height={58} alt=""></Image>
          <p className="mt-6 font-medium text-base text-center text-[#363636]">문의 내역이 없습니다.</p>
        </section>
      )}
      {/* 문의 내역 */}
      {inquiries && inquiries.map((inquiry: Inquiry) => <Inquiry key={inquiry.id} inquiry={inquiry} />)}
    </main>
  );
}
