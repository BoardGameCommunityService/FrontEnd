import Inquiry from "@/components/inquiry/Inquiry";
import Image from "next/image";
import Link from "next/link";

interface Inquiry {
  id: number;
  title: string;
  content: string;
  answer: string | null;
  createdAt: string;
}

export default function InquiriesListPage() {
  // 샘플 문의 내역 데이터
  const inquiries = [
    {
      id: 0,
      title: "문의는 포도가 좋아",
      content: "문의 테스트 1입니다. 문의 테스트 1입니다.",
      answer: null,
      createdAt: "2025.12.06",
    },
    {
      id: 1,
      title: "문의2",
      content: "문의 테스트 2입니다. 문의 테스트 2입니다.",
      answer: "문의 답변입니다. 문의 답변입니다. 문의 답변입니다.",
      createdAt: "2025.12.16",
    },
  ];

  // 문의 내역이 없을 때 빈 배열로 설정
  // const inquiries = [] as Inquiry[];

  return (
    <div className="pt-11 bg-white h-screen flex flex-col">
      <header className="flex px-5 py-[11px] gap-[2px] border-b border-[#F1F1F4]">
        <Link href="/mypage">
          <Image src="/icons/ic_back.svg" width={24} height={24} alt="이전 페이지로 돌아가기"></Image>
        </Link>
        <h1 className="font-semibold text-lg">1:1문의</h1>
      </header>
      <main className="flex-1 overflow-y-auto">
        {/* 문의 내역이 없을 때 보여주는 화면 */}
        {inquiries.length === 0 && (
          <section className="flex flex-col items-center justify-center h-[calc(100%-100px)]">
            <Image src="/icons/ic_empty_logo_with_bubble.svg" width={45} height={58} alt=""></Image>
            <p className="mt-6 font-medium text-base text-center text-[#9B9B9B]">문의 내역이 없습니다.</p>
          </section>
        )}
        {/* 문의 내역 */}
        {inquiries.map((inquiry: Inquiry) => (
          <Inquiry key={inquiry.id} inquiry={inquiry} />
        ))}
      </main>
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
