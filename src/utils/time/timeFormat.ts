import { Timestamp } from "firebase/firestore";

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return formatter.format(date);
};

export const convertTimestampToDate = (timestamp: Timestamp) => {
  const timeToEndTimestamp = new Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds
  );

  return formatDate(timeToEndTimestamp.toDate());
};

export const formatConvertTimestampToDate = (timestamp: Timestamp) => {
  const timeToEndTimestamp = new Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds
  );
  const convertedTimestampToDate = timeToEndTimestamp.toDate();

  return formatHourAndMinutes(convertedTimestampToDate);
};

function formatHourAndMinutes(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString();
  let amPm = hours >= 12 ? "오후" : "오전";

  hours = hours % 12;
  hours = hours ? hours : 12; // 시간이 0이면 12로 설정
  const strMinutes = minutes.length ? "0" + minutes : minutes; // 분이 10보다 작으면 앞에 0을 추가

  return amPm + ":" + hours + ":" + strMinutes;
}
