import TermsLayout from "@/components/terms/TermsLayout";
import { serviceContent } from "@/content/terms/serviceTerms";

export default function Service() {
  return (
    <TermsLayout
      title="서비스 이용 약관"
      intro={serviceContent?.intro}
      sections={serviceContent?.sections}
      footer={serviceContent?.footer}
    />
  );
}
