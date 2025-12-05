import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-[#F5F6FA] min-h-screen">{children}</div>;
}
