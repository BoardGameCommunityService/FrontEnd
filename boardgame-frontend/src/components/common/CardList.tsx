import Card from "./Card";

export default function CardList() {
  const dummyPost = [
    {
      id: "a1er1z1",
      location: "서울시 종로구",
      title: "스플렌더 초고수만",
      currentMember: 3,
      maxMember: 5,
      meetingDate: "2025-11-24T20:00:00+09:00", // ISO 8601 형식
      games: ["루미큐브", "스플렌더", "젠가"],
    },
    {
      id: "a1er1z2",
      location: "서울시 종로구",
      title: "스플렌더 초고수만",
      currentMember: 3,
      maxMember: 5,
      meetingDate: "2025-11-25T19:30:00+09:00",
      games: ["루미큐브", "스플렌더", "젠가"],
    },
    {
      id: "a1er1z3",
      location: "서울시 종로구",
      title: "스플렌더 초고수만",
      currentMember: 3,
      maxMember: 5,
      meetingDate: "2025-11-26T18:00:00+09:00",
      games: ["루미큐브", "스플렌더", "젠가"],
    },
  ];

  return (
    <div>
      <ul className="flex flex-col gap-0.5 items-center">
        {dummyPost.map((post, index) => (
          <Card
            key={index}
            id={post.id}
            location={post.location}
            title={post.title}
            currentMember={post.currentMember}
            maxMember={post.maxMember}
            meetingDate={post.meetingDate}
            games={post.games}
          />
        ))}
      </ul>
    </div>
  );
}
