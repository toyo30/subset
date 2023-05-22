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
  let hours = date.getHours();
  let minutes = date.getMinutes().toString();
  let amPm = hours >= 12 ? "오후" : "오전";

  hours = hours % 12;
  hours = hours ? hours : 12; // 시간이 0이면 12로 설정
  const strMinutes = minutes.length < 2 ? "0" + minutes : minutes; // 분이 10보다 작으면 앞에 0을 추가

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

export const compareTimeToStartWithToday = (timestamp: Timestamp) => {
  const today = dayjs();

  const timeToStartTimestamp = new Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds
  );

  const dateObj = timeToStartTimestamp.toDate();

  const dayjsObj = dayjs(dateObj);

  const compareResult = today.isAfter(dayjsObj);

  return compareResult;
};

export const compareTimeToEndWithToday = (timestamp: Timestamp) => {
  const today = dayjs();

  const timeToEndTimestamp = new Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds
  );

  const dateObj = timeToEndTimestamp.toDate();

  const dayjsObj = dayjs(dateObj);

  const compareResult = today.isBefore(dayjsObj);

  return compareResult;
};

export const isItValidTimeArrange = (
  timeToStart: Timestamp,
  timeToEnd: Timestamp
) => {
  return (
    compareTimeToStartWithToday(timeToStart) &&
    compareTimeToEndWithToday(timeToEnd)
  );
};

export const getTimeDiff = (timestamp: Timestamp): string => {
  const now = Date.now(); // 현재 시간 (밀리초 단위)

  if (!timestamp) {
    return "";
  }

  const timeToEndTimestamp = new Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds
  );
  const convertedTimestampToDate = timeToEndTimestamp.toDate();
  const receivedTime = convertedTimestampToDate.getTime();

  // 두 시간의 차이를 분으로 변환
  const diffInMinutes = Math.round((now - receivedTime) / (1000 * 60));

  if (diffInMinutes < 1) {
    // 1분 이내면 "방금 전" 반환
    return "방금 전";
  } else if (diffInMinutes < 60) {
    // 1시간 이내면 ~분 전 반환
    return `${diffInMinutes}분 전`;
  } else if (diffInMinutes < 1440) {
    // 1440분 = 24시간
    // 24시간 이내면 시간 반환 (소수점 이하 버림)
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}시간 전`;
  } else {
    // 그렇지 않으면 일자 반환 (소수점 이하 버림)
    const diffInDays = Math.floor(diffInMinutes / (60 * 24));
    return `${diffInDays}일 전`;
  }
};
