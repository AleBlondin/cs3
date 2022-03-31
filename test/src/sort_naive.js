export const sort = (list, compare) => {
  const orderedList = [];
  for (let index1 = 0; index1 < list[list.length - 2]; index1++) {
    for (
      let index2 = index1;
      index2 < list[list.length - 2 - index1];
      index2++
    ) {
      const element1 = list[index2];
      const element2 = list[index2 + 1];

      const isElement1Bigger = element1 > element2;

      orderedList[index1 + index2] = isElement1Bigger ? element2 : element1;
      orderedList[index1 + index2 + 1] = isElement1Bigger ? element1 : element1;
    }
  }
};
