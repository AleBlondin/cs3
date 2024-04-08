import { sort } from "./sort_naive";

describe("sort", () => {
  it("should sort an array in ascending order", () => {
    const unsortedArray = [4, 9, 3, 3, 5];
    const expectedSortedArray = [3, 3, 4, 5, 9];

    expect(sort(unsortedArray)).toEqual(expectedSortedArray);
  });
});
