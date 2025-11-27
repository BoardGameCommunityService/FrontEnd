export default function Calendar() {
  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  // 오늘부터 30일간의 날짜 배열 생성
  const getDatesForMonth = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = getDatesForMonth();

  return (
    <ul className="w-[335px]  overflow-x-scroll [&::-webkit-scrollbar]:hidden flex self-start my-4">
      {dates.map((date, index) => {
        const dateNum = date.getDate();
        const dayName = week[date.getDay()];

        return (
          <li key={index}>
            <button className="flex flex-col w-[42px] h-[56px] justify-center">
              <span>{dateNum}</span>
              <span>{dayName}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
