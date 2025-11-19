import React from "react";

interface ButtonType {
  type: "button" | "submit";
  text: string;
  btnSize: "medium" | "large";
  outline?: "default" | "selected";
  bgColor?: string;
  textColor?: string;
  fontWeight?: string;
  icon?: React.ReactNode;
  gap?: string;
  handleSubmit?: () => void;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  type,
  text,
  btnSize,
  outline,
  bgColor = "bg-[#EEF0F7]",
  textColor = "text-[#767676]",
  fontWeight = "font-semibold",
  icon,
  gap = "gap-[4px]",
  onClick,
  disabled,
}: ButtonType) {
  const mediumSize = "py-3.5 text-sm"; //14px 14px
  const largeSize = "py-4 text-base"; //16px 16px
  const btnResultSize = btnSize && btnSize === "medium" ? mediumSize : largeSize;

  const outlineDefault = "border border-[#E9E9ED]";
  const outlineSelected = "border border-[#161616]";
  let outlineResult = "";
  if (outline) outlineResult = outline === "default" ? outlineDefault : outlineSelected;

  return (
    <button
      type={type}
      className={`flex justify-center w-full ${btnResultSize} ${outlineResult} ${gap} rounded-lg ${bgColor} ${btnSize} ${fontWeight} ${textColor} cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {text}
    </button>
  );
}
