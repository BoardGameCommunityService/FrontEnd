interface Participant {
  userId: number;
  nickname: string;
  avatarImageUrl?: string;
}

interface Props {
  participants: Participant[];
  host: { userId: number };
}

export default function MemberList({ participants, host }: Props) {
  return (
    <section className="px-5 mt-5 pb-3">
      <h2 className="text-sm leading-[22px] font-semibold text-[#363636]">멤버</h2>
      <ul className="mt-4 flex flex-col gap-5">
        {participants.map((m) => (
          <li key={m.userId} className="flex items-center gap-3">
            <img src={m.avatarImageUrl} alt={`${m.nickname} 프로필 이미지`} className="w-6 h-6" />
            <span className="text-base text-[#121212] leading-[26px] font-medium">{m.nickname}</span>
            {m.userId === host.userId ? (
              <span className="ml-2 text-[13px] text-[#10C584] font-medium leading-5 bg-[#D1FAEB] rounded-md px-1 py-0.5 inline-block">
                호스트
              </span>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
