import { auth } from "@/auth";
import InquiryList from "@/components/inquiry/InquiryList";
import Image from "next/image";
import Link from "next/link";

interface Inquiry {
  id: number;
  title: string;
  content: string;
  answer: string | null;
  createdAt: string;
}

export default async function InquiriesListPage() {
  const session = await auth();

  // 내 문의 목록 API
  const fetchInquiries = async (): Promise<Inquiry[]> => {
    if (!session?.user?.accessToken) {
      return [];
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/inquiries/my`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`요청 실패: ${response.status}`);
      }

      const data = await response.json();
      return data as Inquiry[];
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다:", error);
      throw error;
    }
  };

  const inquiries = await fetchInquiries();

  return (
    <div className="pt-11 bg-white h-screen flex flex-col">
      <header className="flex px-5 py-[11px] gap-[2px] border-b border-[#F1F1F4]">
        <Link href="/mypage">
          <Image src="/icons/ic_back.svg" width={24} height={24} alt="이전 페이지로 돌아가기"></Image>
        </Link>
        <h1 className="font-semibold text-lg">1:1문의</h1>
      </header>

      <InquiryList inquiries={inquiries} />

      <div className="fixed bottom-0 left-0 right-0 px-5 pb-10 pt-[18px] bg-white flex justify-center">
        <Link
          href="/mypage/inquiries/new"
          className="block text-center w-full bg-[#06E393] py-[11px] rounded-[10px]  max-w-[335px]"
        >
          <p className="font-semibold text-sm">문의하기</p>
        </Link>
      </div>
    </div>
  );
}
