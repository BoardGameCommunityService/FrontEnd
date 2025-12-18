import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const x = searchParams.get("x");
    const y = searchParams.get("y");

    console.log("=== coord2region API 호출 ===");
    console.log("좌표:", { x, y });

    if (!x || !y) {
      console.error("좌표 없음");
      return NextResponse.json({ error: "좌표 정보가 필요합니다" }, { status: 400 });
    }

    const apiKey = process.env.KAKAO_CLIENT_ID;
    console.log("API 키 존재:", !!apiKey);
    console.log("API 키 길이:", apiKey?.length);

    if (!apiKey) {
      console.error("KAKAO_REST_API_KEY 환경 변수 없음");
      console.error(
        "현재 환경 변수:",
        Object.keys(process.env).filter((k) => k.includes("KAKAO"))
      );
      return NextResponse.json({ error: "서버 설정 오류: API 키가 없습니다" }, { status: 500 });
    }

    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("카카오 API 에러:", errorText);
      return NextResponse.json(
        {
          error: "카카오 API 요청 실패",
          status: response.status,
          details: errorText,
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    let addressList = data.documents.filter((doc: any) => doc.region_type === "H");

    addressList = addressList.map((doc: any) => {
      let regionName = doc.region_1depth_name || doc.address_name || "";
      regionName = regionName.replace(/제주특별자치도$/, "제주도");
      regionName = regionName.replace(/특별자치도$/, "");
      regionName = regionName.replace(/^경기도/, "경기");

      return {
        ...doc,
        region_1depth_name: regionName.trim(),
      };
    });

    return NextResponse.json({ documents: addressList });
  } catch (error) {
    console.error("=== coord2region 예외 발생 ===");
    console.error(error);
    return NextResponse.json(
      {
        error: "서버 내부 오류",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
