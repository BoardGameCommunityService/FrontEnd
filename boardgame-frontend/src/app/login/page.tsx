import React from "react";
import type { Metadata } from "next";
import Signin from "@/components/login/Signin";

export const metadata: Metadata = {
  title: "소셜 로그인",
  // 더 좋은 멘트 있으면 추천 부탁드립니다.
  description: "보드메이트에 소셜아이디로 가입하고 새로운 친구들을 만나보세요!",
};

export default function Login() {
  return <Signin />;
}
