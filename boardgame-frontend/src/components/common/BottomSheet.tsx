"use client";

import useBottomSheetStore from "@/stores/useBottomSheetStore";

export default function BottomSheet() {
  const { isOpen, children, variant } = useBottomSheetStore();

  const getHeightClass = () => {
    switch (variant) {
      case "fixed80":
        return "h-5/6";
      case "fixed50":
        return "h-1/2";
      case "auto": // auto (내용에 맞춤)
        return "";
      default:
        return "h-5/6";
    }
  };

  return (
    <>
      <div
        className={`absolute inset-0 bg-[#00000066] transition-opacity duration-400 z-50 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`w-full p-5 absolute bottom-0 left-0 bg-white rounded-t-2xl overflow-hidden transition-transform duration-400 z-50  ${getHeightClass()} ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {children}
      </div>
    </>
  );
}
