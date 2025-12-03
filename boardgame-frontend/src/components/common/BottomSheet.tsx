"use client";

import useBottomSheetStore from "@/stores/useBottomSheetStore";

export default function BottomSheet() {
  const { isOpen, children, variant } = useBottomSheetStore();

  return (
    <>
      <div
        className={`absolute inset-0 bg-[#00000066] transition-opacity duration-400 z-50 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`w-full p-5 absolute bottom-0 left-0 bg-white rounded-t-2xl overflow-hidden transition-transform duration-400 z-50 ${
          variant === "fixed" ? "h-5/6" : ""
        } ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {children}
      </div>
    </>
  );
}
