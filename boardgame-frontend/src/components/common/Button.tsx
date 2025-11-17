import React from "react";

interface ButtonType {
  type: "button" | "submit";
  text: string;
  textSize?: string;
  py?: string;
  bgColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
  gap?: string;
  handleSubmit?: () => void;
  onClick?: () => void;
}

export default function Button({
  type,
  text,
  textSize = "16px",
  py = "py-4",
  bgColor = "bg-[#EEF0F7]",
  textColor = "text-[#767676]",
  icon,
  gap = "gap-[4px]",
  onClick,
}: ButtonType) {
  return (
    <button
      type={type}
      className={`flex justify-center ${gap} rounded-lg ${bgColor} ${py} font-semibold text-[${textSize}] ${textColor} cursor-pointer`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
