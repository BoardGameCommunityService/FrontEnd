// app/signup/location/page.tsx
import SignupLocationForm from "@/components/signup/SignupLocationForm";
import { Suspense } from "react";

export default function SignupLocationPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SignupLocationForm />
    </Suspense>
  );
}
