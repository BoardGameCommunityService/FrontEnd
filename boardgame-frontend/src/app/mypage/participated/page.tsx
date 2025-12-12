import React, { Suspense } from "react";
import ParticipatedPageContent from "./ParticipatedPageContent";

export default function Page() {
  return (
    <Suspense>
      <ParticipatedPageContent />
    </Suspense>
  );
}
