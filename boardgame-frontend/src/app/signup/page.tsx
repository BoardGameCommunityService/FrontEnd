import Image from "next/image";
import Link from "next/link";
import SignupForm from "@/components/signup/SignupForm";

export default function Signup() {
  return (
    <>
      <Link className="w-fit" href="/login">
        <Image src="/icons/ic_close.svg" alt="닫기 버튼" width={24} height={24} />
      </Link>
      <SignupForm />
    </>
  );
}
