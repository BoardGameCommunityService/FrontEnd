"use client";

import { useEffect, useRef } from "react";

interface Props {
  address: string;
}

export default function KakaoMap({ address }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  // 스크립트 로드 함수 (중복 생성 방지, 로드 완료 Promise 반환)
  function loadKakaoSdk(): Promise<void> {
    return new Promise((resolve, reject) => {
      const globalAny: any = window as any;
      if (globalAny.kakao && globalAny.kakao.maps) {
        // 이미 로드된 경우
        resolve();
        return;
      }

      // 이미 삽입된 스크립트가 있으면 로드 완료를 기다림
      const existing = document.querySelector(`script[data-kakao-sdk]`) as HTMLScriptElement | null;
      if (existing) {
        if ((existing as any).__kakaoLoaded) {
          resolve();
        } else {
          existing.addEventListener("load", () => resolve());
          existing.addEventListener("error", (e) => reject(e));
        }
        return;
      }

      // 스크립트 생성
      const script = document.createElement("script");
      script.setAttribute("data-kakao-sdk", "1");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services&autoload=false`;
      script.async = true;
      script.onload = () => {
        (script as any).__kakaoLoaded = true;
        resolve();
      };
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        await loadKakaoSdk();
        const globalAny: any = window as any;
        // autoload=false 이므로 maps.load로 초기화 콜백 실행
        globalAny.kakao.maps.load(() => {
          if (!mounted) return;
          // 지도 초기화 로직 (예시)
          const container = mapRef.current!;
          const options = { center: new globalAny.kakao.maps.LatLng(33.450701, 126.570667), level: 3 };
          const map = new globalAny.kakao.maps.Map(container, options);

          // 주소 -> 좌표 변환 후 마커 표시 등 (서비스 이용)
          const geocoder = new globalAny.kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, (result: any, status: any) => {
            if (status === globalAny.kakao.maps.services.Status.OK) {
              const coords = new globalAny.kakao.maps.LatLng(result[0].y, result[0].x);
              map.setCenter(coords);
              new globalAny.kakao.maps.Marker({ map, position: coords });
            }
          });
        });
      } catch (e) {
        console.error("Kakao SDK 로드 실패", e);
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, [address]);

  return <div ref={mapRef} className="w-full h-[180px] rounded-xl overflow-hidden" />;
}
