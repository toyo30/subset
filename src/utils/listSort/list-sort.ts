export const sortByLike = (array: any[]) => {
  return array.sort((a, b) => b.like - a.like);
};
