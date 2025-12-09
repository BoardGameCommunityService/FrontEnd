import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  const size = 15;
  const page = 1;

  if (!query) {
    return NextResponse.json({ error: "검색어가 필요합니다" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&page=${page}&size=${size}`,
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

    return NextResponse.json({ documents: data });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "검색에 실패했습니다" }, { status: 500 });
  }
}
