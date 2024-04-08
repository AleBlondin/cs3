export const sort = (list, compare) => {
  const orderedList = [...list]; // Make a copy of the original list

  for (let i = 0; i < orderedList.length - 1; i++) {
    for (let j = 0; j < orderedList.length - i - 1; j++) {
      // Swap elements if they are in the wrong order
      if (orderedList[j] > orderedList[j + 1]) {
        const temp = orderedList[j];
        orderedList[j] = orderedList[j + 1];
        orderedList[j + 1] = temp;
      }
    }
  }

  return orderedList;
}
