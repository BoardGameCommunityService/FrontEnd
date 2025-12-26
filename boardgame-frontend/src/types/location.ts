export interface LocationSearchResultsProps {
  results: string[];
  onSelect: (location: string) => void;
  isLoading: boolean;
}
