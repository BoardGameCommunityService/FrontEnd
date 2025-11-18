import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "회원가입 | 보드메이트",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-col pt-10 px-5 pb-1.5 h-screen">{children}</main>;
}
