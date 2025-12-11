"use client";

/**
 * 상세 게시글 로딩용 스켈레톤
 */
export default function MeetingSkeleton() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="px-5 flex justify-between items-center h-12">
        <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-6 w-28 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse" />
      </header>

      <main className="px-5 mt-2.5 space-y-4">
        {/* 제목 */}
        <div className="h-7 w-3/4 bg-gray-200 rounded-md animate-pulse" />

        {/* 태그 리스트 (Badge들) */}
        <ul className="flex gap-2 mt-3">
          <li className="px-1.5 py-0.5 rounded-lg bg-gray-100 w-24 h-6 animate-pulse" />
          <li className="px-1.5 py-0.5 rounded-lg bg-gray-100 w-20 h-6 animate-pulse" />
          <li className="px-1.5 py-0.5 rounded-lg bg-gray-100 w-16 h-6 animate-pulse" />
        </ul>

        {/* 내용 박스 */}
        <div className="mt-4 bg-[#F5F6FA] rounded-xl p-3">
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-4/6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* 날짜 섹션 */}
        <section className="mt-2">
          <h2 className="text-sm text-[#363636] font-semibold leading-[22px]">날짜</h2>
          <div className="flex items-center gap-2 mt-2 border border-[#DEE1E6] rounded-lg py-[9px] px-3">
            <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
          </div>
        </section>

        {/* 장소 섹션 (마커 + 요약 + 지도 자리) */}
        <section className="mt-4">
          <h2 className="text-sm text-[#363636] font-semibold leading-[22px]">장소</h2>
          <address className="mt-2 border border-[#DEE1E6] rounded-xl not-italic">
            <div className="flex gap-[5px] px-3 py-[9px]">
              <div className="self-start mt-[3px] w-4 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="flex flex-col">
                <div className="h-4 w-44 bg-gray-200 rounded animate-pulse mb-1" />
                <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            <div className="h-44 bg-gray-100 rounded-b-xl" />
          </address>
        </section>

        <div className="h-2.5 bg-[#F5F6FA] mt-5" role="separator" aria-hidden="true" />

        {/* 멤버 리스트 */}
        <section className="mt-5 pb-3">
          <h2 className="text-sm leading-[22px] font-semibold text-[#363636]">멤버</h2>
          <ul className="mt-4 flex flex-col gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="ml-2 h-4 w-12 bg-gray-200 rounded animate-pulse" />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <div className="mb-1.5 fixed bottom-0 right-0 left-1/2 -translate-x-1/2 w-full max-w-[335px] p-4">
        <div className="w-full h-12 rounded-[10px] bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
