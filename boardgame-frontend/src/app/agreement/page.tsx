import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용 약관",
  description: "보드메이트를 이용하시려면 다음과 같은 약관에 동의하셔야 합니다.",
};

export default function Agreement() {
  return (
    <main>
      <div>
        <button>X</button>
        <h1>약관 동의</h1>
      </div>
      <footer>
        <button>다음</button>
      </footer>
    </main>
  );
}
