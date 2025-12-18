import InquiryList from "@/components/inquiry/InquiryList";
import Image from "next/image";
import Link from "next/link";

export default function InquiriesListPage() {
  return (
    <div className="pt-11 bg-white h-screen flex flex-col">
      <header className="flex px-5 py-[11px] gap-[2px] border-b border-[#F1F1F4]">
        <Link href="/mypage">
          <Image src="/icons/ic_back.svg" width={24} height={24} alt="이전 페이지로 돌아가기"></Image>
        </Link>
        <h1 className="font-semibold text-lg">1:1문의</h1>
      </header>

      <InquiryList />

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
