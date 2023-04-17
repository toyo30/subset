export const backgroundColors = [
  "#FF4500", // 주황색
  "#008000", // 녹색
  "#800080", // 보라색
  "#FFD700", // 금색
  "#DC143C", // 진한 붉은색
  "#1E90FF", // 진한 하늘색
  "#FF69B4", // 진한 핫핑크
  "#8B0000", // 진한 빨간색
  "#008080", // 청록색
  "#7CFC00", // 라임색
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randomIndex];
};

export const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
