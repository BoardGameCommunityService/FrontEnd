import SearchClient from "./SearchClient";

type dataType = {
  name: string;
  count: number;
};

async function getPopularGames() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/meetings/popular/games`);
  if (!res.ok) throw new Error("게임 데이터 fetch 실패");
  const data: dataType[] = await res.json();
  return data.map((item) => item.name);
}

async function getPopularRegions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/meetings/popular/regions`);
  if (!res.ok) throw new Error("지역 데이터 fetch 실패");
  const data: dataType[] = await res.json();
  return data.map((item) => item.name);
}

export default async function Page() {
  //병렬 동기화를 위해 promise.all사용
  const [popularGames, popularRegions] = await Promise.all([getPopularGames(), getPopularRegions()]);

  return <SearchClient popularGames={popularGames} popularRegions={popularRegions} />;
}
