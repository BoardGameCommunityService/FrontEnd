import { LocationSearchResultsProps } from "@/types/location";

export default function LocationSearchResults({ results, onSelect, isLoading }: LocationSearchResultsProps) {
  if (isLoading) {
    return (
      <section className="mt-6 text-[#999999]">
        <h3 className="text-xs">검색 중...</h3>
      </section>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 text-[#999999]">
      <h3 className="text-xs">검색 결과</h3>
      <ul>
        {results.map((result, index) => {
          return (
            <li key={index} className="my-3 text-[#161616]">
              <button
                type="button"
                onClick={() => onSelect(result)}
                className="w-full text-left transition-colors cursor-pointer"
              >
                {result}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
