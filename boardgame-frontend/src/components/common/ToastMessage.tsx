"use client";

import { useEffect, useState } from "react";
import useToastMessage from "@/stores/useToastMessage";

export default function ToastMessage() {
  const { isOpen, variant, message, setClose } = useToastMessage();
  const [isVisible, setIsVisible] = useState(false);

  const DURATION = 1000;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true));

      const closeTimer = setTimeout(() => {
        setTimeout(() => {
          setClose();
        }, 500);

        setIsVisible(false);
      }, DURATION);

      return () => clearTimeout(closeTimer);
    }
  }, [isOpen, DURATION, setClose]);

  return (
    <>
      {isOpen && (
        <div
          className={`${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} transition-all duration-500 ease-out absolute bottom-2 translate-x-1/2 flex gap-2 items-center w-[202px] bg-[#161616] rounded-xl py-3 pl-4 pr-5`}
        >
          {variant === "success" ? (
            <>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.6663 5L7.49967 14.1667L3.33301 10"
                  stroke="#06E393"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-[#06E393] text-[15px] leading-6 font-medium">{message}</p>
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_738_4555)">
                  <path
                    d="M10.0003 18.3332C14.6027 18.3332 18.3337 14.6022 18.3337 9.99984C18.3337 5.39746 14.6027 1.6665 10.0003 1.6665C5.39795 1.6665 1.66699 5.39746 1.66699 9.99984C1.66699 14.6022 5.39795 18.3332 10.0003 18.3332Z"
                    stroke="#FC3B45"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 6.6665V9.99984"
                    stroke="#FC3B45"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 13.3335H10.0083"
                    stroke="#FC3B45"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_738_4555">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <p className="text-[#FC3B45] text-[15px] leading-6 font-medium">{message}</p>
            </>
          )}
        </div>
      )}
    </>
  );
}
