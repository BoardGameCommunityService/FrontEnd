import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import GenderRadio from "@/components/signup/GenderRadio";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <Link className="w-fit" href="/login">
        <Image src="/icons/ic_close.svg" alt="닫기 버튼" width={24} height={24} />
      </Link>

      <form className="flex flex-col justify-between flex-1">
        <div>
        <h2 className="mt-4 mb-10 font-semibold text-2xl text-[#161616]">회원 정보를 입력해주세요</h2>
          <fieldset>
          <TextInput label="닉네임" name="nickname" placeholder="닉네임을 입력해주세요" />
            <div className="flex items-center gap-1 mt-2">
              <Image src="/icons/ic_information.svg" alt="" width={16} height={16} />
              <span className="text-[13px] text-[#999999]">특수기호를 제외한 한글 또는 영문을 입력해주세요</span>
            </div>
          </fieldset>

          <fieldset className="w-full mt-8">
            <legend className="text-sm font-medium text-[#363636]">성별</legend>
            <div className="flex gap-2 mt-3 ">
              <GenderRadio id="man" name="gender" value="M" label="남성" />
              <GenderRadio id="female" name="gender" value="F" label="여성" />
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="block font-medium text-sm text-[#363636]">지역</legend>
            <Link
              className="flex items-center justify-between mt-3 text-sm text-[#767676] border border-[#E9E9ED] rounded-xl py-3.5 pl-3 pr-3.5"
              href="/signup/location"
            >
              활동 지역을 선택해주세요
              <Image src="/icons/ic_chevron_right_icon.svg" alt="" width={20} height={20} />
            </Link>
          </fieldset>
        </div>

        <Button type="submit" text="다음" btnSize="large" />
      </form>
    </>
  );
}
