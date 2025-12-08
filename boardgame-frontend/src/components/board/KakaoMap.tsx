"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap({ address }: { address: string }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(address, function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const imageSrc = "/icons/ic_marker.svg"; // 마커이미지의 주소입니다
          const imageSize = new window.kakao.maps.Size(32, 32);
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

          // 결과값으로 받은 위치를 마커로 표시합니다
          new window.kakao.maps.Marker({
            image: markerImage,
            map: map,
            position: coords,
          });

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    });
  }, [address]);

  return (
    <>
      <div className="h-[160px] rounded-b-xl" ref={mapContainer}></div>
    </>
  );
}
