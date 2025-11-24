import Link from "next/link";
import Image from "next/image";
import mapPin from "../../../public/icons/map-pin.svg";
import Badge from "./Badge";
import dateFormatter from "@/util/dateFormatter";

interface CardProps {
  id: string;
  location: string;
  title: string;
  currentMember: number;
  maxMember: number;
  games: string[];
  meetingDate: string;
}

/**
 *
 * @param id sting 게시글 id
 * @param location string 주소(서울 종로구)
 * @param title string 게시글제목
 * @param currentMember number 지금 참여한 인원수
 * @param maxMember number 모집하는 총 인원수
 * @param games string[] 게임태그
 * @param meetingDate string 모임 시간
 */
export default function Card({ id, location, title, currentMember, maxMember, games, meetingDate }: CardProps) {
  const posting = "/";
  const postingId = id;
  return (
    <article className="w-[335px] h-[116px] rounded-2xl p-4 bg-white">
      <Link href={posting} className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-1">
          <div className="flex">
            <Image src={mapPin} alt="위치" width={18} height={18} />
            <span className="font-medium text-[13px] text-[#767676]">{location}</span>
          </div>
          <Badge>{dateFormatter(meetingDate)}</Badge>
        </div>
        <h2 className="font-medium text-[15px] text-[#161616]">{title}</h2>
        <ul className="flex gap-1">
          <Badge>{`${currentMember}/${maxMember} 명`}</Badge>
          {games.map((game, index) => (
            <Badge key={index}>{game}</Badge>
          ))}
        </ul>
      </Link>
    </article>
  );
}
