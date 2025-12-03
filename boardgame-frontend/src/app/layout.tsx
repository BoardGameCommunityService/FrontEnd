import "./globals.css";

import React from "react";
import Providers from "@/components/Providers";
import BottomSheet from "@/components/common/BottomSheet";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex justify-center">
        <Providers>
          <div className="w-[375px] min-h-dvh relative overflow-hidden">
            <div className="w-full">
              {children}
              <BottomSheet />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
