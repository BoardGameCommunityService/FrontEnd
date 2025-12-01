import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "검색어가 필요합니다" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("카카오 API 요청 실패");
    }

    const data = await response.json();

    // 행정구역 정보만 추출
    const filteredResults = data.documents
      .filter((doc: any) => doc.address_type === "REGION" || doc.address)
      .map((doc: any) => {
        // REGION 타입인 경우
        if (doc.address_type === "REGION") {
          return {
            region_1depth_name: doc.address_name.split(" ")[0] || "",
            region_2depth_name: doc.address_name.split(" ")[1] || "",
          };
        }
        // 일반 주소인 경우
        return {
          region_1depth_name: doc.address?.region_1depth_name || "",
          region_2depth_name: doc.address?.region_2depth_name || "",
        };
      })
      .filter((item: any) => item.region_1depth_name && item.region_2depth_name);

    //주소 중복제거
    const uniqueResults = Array.from(
      new Map(
        filteredResults.map((item: any) => [`${item.region_1depth_name}-${item.region_2depth_name}`, item])
      ).values()
    );

    return NextResponse.json({ documents: uniqueResults });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "검색에 실패했습니다" }, { status: 500 });
  }
}
