import { sort } from "./sort_naive";

describe("sort", () => {
  it("should sort an array in ascending order", () => {
    const unsortedArray = [15, 3, 2, 16, 18, 25, 22];
    const expectedSortedArray = [2, 3, 15, 16, 18, 22, 25];

    expect(sort(unsortedArray)).toEqual(expectedSortedArray);
  });
});
