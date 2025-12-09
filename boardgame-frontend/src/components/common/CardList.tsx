import Card from "./Card";
import { Post } from "@/types/post";

interface CardListProps {
  results: Post[];
}

export default function CardList({ results }: CardListProps) {
  return (
    <div>
      <ul className="flex flex-col gap-0.5 items-center">
        {results.map((post) => (
          <Card
            key={post.meetingId}
            id={post.meetingId}
            location={post.meetingPlace}
            title={post.title}
            currentMember={post.currentParticipants}
            maxMember={post.maxParticipants}
            meetingDate={post.meetingAt}
            games={parseTags(post.gameNameJson)}
          />
        ))}
      </ul>
    </div>
  );
}
