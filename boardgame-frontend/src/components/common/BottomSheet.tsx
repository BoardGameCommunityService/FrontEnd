"use client";

import useBottomSheetStore from "@/stores/useBottomSheetStore";

export default function BottomSheet() {
  const { isOpen, children } = useBottomSheetStore();
  return <div className="p-5 absolute bottom-0">{isOpen && children}</div>;
}
