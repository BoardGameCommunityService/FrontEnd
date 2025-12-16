import CreateBoard from "@/components/board/CreateBoard";

export default async function New({ searchParams }: { searchParams: Promise<any> }) {
  const query = await searchParams;
  const id = query.id || 0;

  return <CreateBoard id={id} />;
}
