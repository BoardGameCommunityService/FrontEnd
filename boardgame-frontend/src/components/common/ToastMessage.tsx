"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ToastMessageProps {
  variant: "success" | "failure";
  message: string;
  duration: number;
}

export default function ToastMessage({ variant, message, duration }: ToastMessageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>click</button>
      <div
        className={`${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} transition-all duration-300 ease-out absolute bottom-2 translate-x-1/2 flex gap-2 items-center w-[202px] bg-[#161616] rounded-xl py-3 pl-4 pr-5`}
      >
        {variant === "success" ? (
          <Image src="/icons/ic_check.svg" alt="" width={20} height={20} />
        ) : (
          <Image src="/icons/ic_info_red.svg" alt="" width={20} height={20} />
        )}
        <p className="text-[#06E393] text-[15px] leading-6 font-medium">{message}</p>
      </div>
    </>
  );
}
