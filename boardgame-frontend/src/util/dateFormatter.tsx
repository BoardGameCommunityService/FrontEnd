interface DateFormat {
  year: string;
  month: string;
  day: string;
  weekday: string;
  hours: string;
  minutes: string;
}

export default function dateFormatter(isoDate: string): DateFormat {
  const date = new Date(isoDate);

  const year = String(date.getFullYear()).padEnd(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];

  return { year, month, day, hours, minutes, weekday };
}

// 날짜+시간 표시용 포맷 (예: "25.11.30(일) 오후 2:00")
export function formatDateTime(date: Date): string {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];

  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const period = date.getHours() < 12 ? "오전" : "오후";
  const hour = date.getHours() % 12 || 12;
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day}(${weekday}) ${period} ${hour}:${minute}`;
}
