import TermsLayout from "@/components/terms/TermsLayout";
import { privacyContent } from "@/content/terms/privacyTerms";

export default function Privacy() {
  return (
    <TermsLayout
      title="서비스 이용 약관"
      intro={privacyContent?.intro}
      sections={privacyContent?.sections}
      footer={privacyContent?.footer}
    />
  );
}
