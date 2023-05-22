export enum pinStatus {
  Cool = "Cool",
  Hot = "Hot",
  Super = "Super",
}

export const urlByStatus = (status: string) => {
  if (status === pinStatus.Cool || status === "") {
    return `${process.env.PUBLIC_URL}/Cool.png`;
  }

  if (status === pinStatus.Hot) {
    return `${process.env.PUBLIC_URL}/Hot.png`;
  }

  if (status === pinStatus.Super) {
    return `${process.env.PUBLIC_URL}/Super.png`;
  }

  return `${process.env.PUBLIC_URL}/Cool.png`;
};
