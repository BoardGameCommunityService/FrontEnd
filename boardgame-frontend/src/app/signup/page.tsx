import Image from "next/image";
import Link from "next/link";
import { SearchParams } from "next/dist/server/request/search-params";
import SignupForm from "@/components/signup/SignupForm";
import { SearchFormValueType } from "@/types/SearchFormValueType";

export default async function Signup({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { nickname = "", gender = "", location = "" }: SearchFormValueType = await searchParams;

  return (
    <>
      <Link className="w-fit" href="/login">
        <Image src="/icons/ic_close.svg" alt="닫기 버튼" width={24} height={24} />
      </Link>
      <SignupForm nickname={nickname} gender={gender} location={location} />
    </>
  );
}
