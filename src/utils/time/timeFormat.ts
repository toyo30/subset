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
