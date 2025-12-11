import KakaoMap from "@/components/board/KakaoMap";
import Image from "next/image";

interface Props {
  meetingPlace: string;
  meetingAddress: string;
}

export default function PlaceSection({ meetingPlace, meetingAddress }: Props) {
  return (
    <section className="px-5 mt-6">
      <h2 className="text-sm text-[#363636] font-semibold leading-[22px]">장소</h2>
      <address className="mt-2 border border-[#DEE1E6] rounded-xl not-italic">
        <div className="flex gap-[5px] px-3 py-[9px]">
          <Image className="self-start mt-[3px]" src="/icons/ic_black_marker.svg" alt="" width={16} height={16} />
          <div className="flex flex-col">
            <h3 className="text-sm text-[#161616] font-semibold leading-[22px]">{meetingPlace}</h3>
            <span className="text-xs text-[#767676] leading-[18px]">{meetingAddress}</span>
          </div>
        </div>

        <div>
          <KakaoMap address={meetingAddress} />
        </div>
      </address>
    </section>
  );
}
