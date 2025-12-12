"use client";

import { useEffect } from "react";
import useModalStore from "@/stores/useModalStore";

export default function Modal() {
  const { isOpen, content, leftBtnTxt, rightBtnTxt, leftOnClick, rightOnClick } = useModalStore();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#00000066] z-50"></div>
          <dialog className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 z-50 p-5 bg-white rounded-2xl">
            <h2 className="w-[295px] break-keep text-center text-[18px] leading-[26px] font-semibold">{content}</h2>
            <div className="flex gap-2 mt-6">
              {leftBtnTxt && (
                <button
                  className="w-full bg-[#EEF0F7] text-sm leading-[22px] py-[11px] rounded-[10px] cursor-pointer"
                  onClick={leftOnClick}
                >
                  {leftBtnTxt}
                </button>
              )}
              {rightBtnTxt && (
                <button
                  className="w-full bg-[#06E393] text-sm leading-[22px] py-[11px] rounded-[10px] cursor-pointer"
                  onClick={rightOnClick}
                >
                  {rightBtnTxt}
                </button>
              )}
            </div>
          </dialog>
        </>
      )}
    </>
  );
}
