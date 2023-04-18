import dayjs, { Dayjs } from "dayjs";
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
  console.log(date, "date");
  let hours = date.getHours();
  let minutes = date.getMinutes().toString();
  let amPm = hours >= 12 ? "오후" : "오전";

  hours = hours % 12;
  hours = hours ? hours : 12; // 시간이 0이면 12로 설정
  const strMinutes = minutes.length < 2 ? "0" + minutes : minutes; // 분이 10보다 작으면 앞에 0을 추가

  console.log(`${amPm} : ${hours}: ${strMinutes}`, "date");
  return amPm + " " + hours + ":" + strMinutes;
}

export const convertDayjsTostamp = (dayjsObj: Dayjs) => {
  // Dayjs 객체를 JavaScript Date 객체로 변환
  const dateObj = dayjsObj.toDate();

  // JavaScript Date 객체를 Firestore Timestamp 객체로 변환
  const timestamp = Timestamp.fromDate(dateObj);

  // Firestore에 Timestamp 객체를 저장
  return timestamp;
};

export const convertTimeTostampToDayjs = (timestamp: Timestamp) => {
  // Dayjs 객체를 JavaScript Date 객체로 변환
  console.log(timestamp, "convertTimeTostampToDayjs timestamp");

  const timeToEndTimestamp = new Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds
  );

  const dateObj = timeToEndTimestamp.toDate();

  const dayjsObj = dayjs(dateObj);

  // JavaScript Date 객체를 Firestore Timestamp 객체로 변환

  // Firestore에 Timestamp 객체를 저장
  return dayjsObj;
};
