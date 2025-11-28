import Header from "@/components/common/Header";
import nextIcon from "../../../../public/icons/ic_chevron_right_icon.svg";
import calendarIcon from "../../../../public/icons/ic_calendor.svg";

import Image from "next/image";

export default function New() {
  return (
    <div className="flex justify-center">
      <div className="w-[375px] flex flex-col ">
        <Header />
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="mt-[18px] w-full h-12 rounded-xl px-3 border border-[#DEE1E6] text-[12px] placeholder:text-[#767676]"
        />
        <textarea
          placeholder="모임 소개글을 입력해주세요."
          className="mt-4 resize-none w-full min-h-60 px-3 py-3 bg-white rounded-xl border border-[#DEE1E6] text-[12px] placeholder:text-[#767676] field-sizing-content"
        />
        <h3 className="font-medium text-[14px] text-[#363636] mt-[25px]">게임 지정</h3>
        <h3 className="font-medium text-[14px] text-[#363636] mt-[31px]">인원</h3>
        <div className="flex flex-col gap-3 mt-[31px]">
          <h3 className="font-medium text-[14px] text-[#363636]">위치</h3>
          <button
            type="button"
            className="cursor-pointer w-full h-12 rounded-xl flex justify-between border border-[#DEE1E6] py-3.5 px-3"
          >
            <span className="font-normal text-[14px] text-[#767676]">모임 위치를 입력해주세요.</span>
            <Image src={nextIcon} alt="" width={20} height={20} />
          </button>
        </div>
        <div className="flex flex-col gap-3 mt-8">
          <h3 className="font-medium text-[14px] text-[#363636]">날짜</h3>
          <button
            type="button"
            className="cursor-pointer w-full h-12 rounded-xl flex justify-between border border-[#DEE1E6] py-3.5 px-3"
          >
            <span className="font-normal text-[14px] text-[#767676]">날짜를 지정해주세요.</span>
            <Image src={calendarIcon} alt="" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
