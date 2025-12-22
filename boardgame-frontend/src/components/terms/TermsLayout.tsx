import Image from "next/image";
import Link from "next/link";

interface SubItem {
  text: string;
  subItems?: string[];
}

interface Section {
  title: string;
  content: string[];
  items?: SubItem[];
}

interface TermsContentProps {
  title: string;
  intro: string;
  sections: Section[];
  footer: string;
}

export default function TermsLayout({ title, intro, sections, footer }: TermsContentProps) {
  return (
    <>
      <section className="mx-5 my-[11px] flex gap-[2px]">
        <Link href="/login">
          <Image src="/icons/ic_back.svg" width={24} height={24} alt="이전 페이지로 돌아가기" />
        </Link>
        <h2 className="text-lg font-semibold text-[#161616]">{title}</h2>
      </section>
      <section className="mx-5 my-[11px] text-sm whitespace-pre-line text-[#363636]">
        <p>{intro}</p>

        {/* 조항들 */}
        {sections.map((section, idx) => (
          <article key={idx}>
            <h2>
              <br />
              {section.title}
            </h2>

            {/* 일반 텍스트 */}
            {section.content.map((text, textIdx) => (
              <p key={textIdx}>{text}</p>
            ))}

            {/* 번호 목록 */}
            {section.items && (
              <ol>
                {section.items.map((item, itemIdx) => (
                  <ul key={itemIdx}>
                    <li>
                      {itemIdx + 1}. {item.text}
                    </li>
                    {/* 하위 항목 (가, 나, 다, 라) */}
                    {item.subItems && (
                      <div>
                        {item.subItems.map((subItem, subIdx) => (
                          <li key={subIdx}>
                            {String.fromCharCode(44032 + subIdx)}. {subItem}
                          </li>
                        ))}
                      </div>
                    )}
                  </ul>
                ))}
              </ol>
            )}
          </article>
        ))}

        {/* 부칙 */}
        <article>
          <p>
            <br />
            s부칙
          </p>
          <p>{footer}</p>
        </article>
      </section>
    </>
  );
}
