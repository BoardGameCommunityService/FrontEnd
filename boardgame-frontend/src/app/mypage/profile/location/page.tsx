import SignupLocationForm from "@/components/signup/SignupLocationForm";
import { Suspense } from "react";

export default function ProfileLocationPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SignupLocationForm />
    </Suspense>
  );
}
