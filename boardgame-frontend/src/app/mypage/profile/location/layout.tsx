import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-5 pt-10 bg-white min-h-screen">{children}</div>;
}
