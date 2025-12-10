"use client";

import { useEffect } from "react";

export default function Modal() {
  const content = "회원가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.";

  const leftBtn = () => {
    console.log("왼쪽 버튼");
  };
  const leftBtnTxt = "취소";

  const rightBtn = () => {
    console.log("오른쪽 버튼");
  };
  const rightBtnTxt = "확인";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#00000066] z-50"></div>
      <dialog className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 z-50 p-5 bg-white rounded-2xl">
        <h2 className="w-[295px] break-keep text-center text-[18px] leading-[26px] font-semibold">{content}</h2>
        <div className="flex gap-2 mt-6">
          {leftBtnTxt && (
            <button
              className="w-full bg-[#EEF0F7] text-sm leading-[22px] py-[11px] rounded-[10px] cursor-pointer"
              onClick={leftBtn}
            >
              {leftBtnTxt}
            </button>
          )}
          {rightBtnTxt && (
            <button
              className="w-full bg-[#06E393] text-sm leading-[22px] py-[11px] rounded-[10px] cursor-pointer"
              onClick={rightBtn}
            >
              {rightBtnTxt}
            </button>
          )}
        </div>
      </dialog>
    </>
  );
}
