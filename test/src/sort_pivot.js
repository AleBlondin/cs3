const sortInternal = (tab, start, end, cmp) => {
  if (end - start < 2) return tab;

  let pivot = start;
  for (let idx = start + 1; idx < end; ++idx) {
    if (!cmp(tab[start], tab[idx])) {
      let prev = tab[++pivot];
      tab[pivot] = tab[idx];
      tab[idx] = prev;
    }
  }
  let prev = tab[pivot];
  tab[pivot] = tab[start];
  tab[start] = prev;

  sortInternal(tab, start, pivot, cmp);
  sortInternal(tab, pivot + 1, end, cmp);
  return tab;
};

export const sort = (tab, compare) => {
  return sortInternal([...tab], 0, tab.length, compare || ((a, b) => a < b));
};
