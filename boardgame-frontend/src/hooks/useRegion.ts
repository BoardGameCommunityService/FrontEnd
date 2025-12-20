"use client";

import { LocationResult } from "@/types/location";
import { useState } from "react";

interface Place {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  phone: string;
  category_name: string;
  place_url: string;
}

interface KeywordSearchResult {
  meta: {
    total_count: number;
    is_end: boolean;
  };
  documents: {
    documents: Place[];
  };
}

export function useRegion() {
  const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [totalCount, setTotalCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  // 현재 위치 가져오기
  const getCurrentRegion = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error("위치 서비스를 지원하지 않는 브라우저입니다");
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      const response = await fetch(`/api/location/coord2address?x=${longitude}&y=${latitude}`);

      if (!response.ok) {
        throw new Error("위치 정보를 가져올 수 없습니다");
      }

      const data = await response.json();
      setSearchResults(data.documents || []);

      return data.documents;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "위치 정보를 가져올 수 없습니다";
      setError(errorMessage);
      alert(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // 주소로 좌표 검색
  const searchAddress = async (regionInput: string) => {
    if (!regionInput.trim()) {
      setSearchResults([]);
      return [];
    }

    setIsLoading(true);
    setError(null);

    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const response = await fetch(`/api/location/address2coord?query=${encodeURIComponent(regionInput)}`);

      if (!response.ok) {
        throw new Error("검색에 실패했습니다");
      }

      const data = await response.json();
      await minLoadingTime;
      setSearchResults(data.documents || []);

      return data.documents;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "검색에 실패했습니다";
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // 키워드로 장소 검색
  const searchPlaces = async (keyword: string) => {
    if (!keyword.trim()) {
      setError("검색어를 입력해주세요.");
      setPlaces([]);
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        query: keyword.trim(),
      });

      const response = await fetch(`/api/location/keyword2places?${params.toString()}`);

      if (!response.ok) {
        throw new Error("검색에 실패했습니다.");
      }

      const data: KeywordSearchResult = await response.json();

      setPlaces(data.documents.documents);

      // setTotalCount(data.meta.total_count);
      // setIsEnd(data.meta.is_end);

      return data.documents.documents;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setError(errorMessage);
      setPlaces([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // 주소/좌표 관련
    searchResults,
    getCurrentRegion,
    searchAddress,

    // 키워드 검색 관련
    places,
    searchPlaces,
    // totalCount,
    isEnd,

    // 공통
    isLoading,
    error,
  };
}
