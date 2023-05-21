export const sortByLike = (array: any[]) => {
  return array.sort((a, b) => b.like - a.like);
};

export const sortByTime = (array: any[]) => {
  return array.sort((a, b) => {
    if (a.time === undefined) {
      return 1;
    }
    if (b.time === undefined) {
      return -1;
    }

    return b.time - a.time;
  });
};
