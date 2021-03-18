import React from "react";
import renderer from "react-test-renderer";
import Counter from "./Counter";

it("renders correctly", () => {
  const tree = renderer.create(<Counter />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with a title", () => {
  const tree = renderer.create(<Counter title="custom title" />).toJSON();
  expect(tree).toMatchSnapshot();
});
