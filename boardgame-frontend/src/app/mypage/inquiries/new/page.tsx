import { auth } from "@/auth";
import ToastMessage from "@/components/common/ToastMessage";
import InquiryForm from "@/components/inquiry/InquiryForm";
import Image from "next/image";
import Link from "next/link";

export default async function InquiriesListPage() {
  const session = await auth();

  return (
    <div className="pt-11 bg-white h-screen flex flex-col">
      <header className="flex px-5 py-[11px] gap-[2px]">
        <Link href="/mypage/inquiries/list">
          <Image src="/icons/ic_back.svg" width={24} height={24} alt="이전 페이지로 돌아가기"></Image>
        </Link>
        <h1 className="font-semibold text-lg">문의하기</h1>
      </header>
      <main className="px-5 flex-1 overflow-y-auto">
        <InquiryForm accessToken={session?.user?.accessToken} />
      </main>
      <ToastMessage />
    </div>
  );
}
