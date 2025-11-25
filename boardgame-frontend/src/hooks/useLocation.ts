"use client";

import { LocationResult } from "@/types/location";
import { useState } from "react";

export function useLocation() {
  const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
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

      const response = await fetch(`/api/location/coord2region?x=${longitude}&y=${latitude}`);

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

  const searchAddress = async (locationInput: string) => {
    if (!locationInput.trim()) {
      setSearchResults([]);
      return [];
    }

    setIsLoading(true);
    setError(null);

    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const response = await fetch(`/api/location/search?query=${encodeURIComponent(locationInput)}`);

      if (!response.ok) {
        throw new Error("검색에 실패했습니다");
      }

      const data = await response.json();
      await minLoadingTime; // 최소 로딩 시간 대기
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

  return {
    searchResults,
    isLoading,
    error,
    getCurrentLocation,
    searchAddress,
  };
}
