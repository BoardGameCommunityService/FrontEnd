export interface LocationSearchResultsProps {
  results: String[];
  onSelect: (location: String) => void;
  isLoading: boolean;
}
