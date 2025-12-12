import "./globals.css";

import React from "react";
import Providers from "@/components/Providers";
import BottomSheet from "@/components/common/BottomSheet";
import Modal from "@/components/common/Modal";

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
            <div className="h-screen overflow-y-scroll scrollbar-hide">
              {children}
              <BottomSheet />
              <Modal />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
