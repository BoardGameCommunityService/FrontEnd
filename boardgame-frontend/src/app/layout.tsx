import "./globals.css";

import React from "react";
import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex justify-center">
        <Providers>
          <div className="w-[375px]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
