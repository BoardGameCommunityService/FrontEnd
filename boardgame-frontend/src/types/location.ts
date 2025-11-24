export interface LocationResult {
  region_1depth_name: string; // "서울특별시"
  region_2depth_name: string; // "강남구"
}

export interface LocationResponse {
  documents: LocationResult[];
}
