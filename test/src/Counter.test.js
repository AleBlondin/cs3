import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";

test("counter value initially is zero", () => {
  const renderedCounter = render(<Counter />);
  console.log(renderedCounter.debug());
  expect(screen.queryByText("0")).not.toBeNull();
  expect(screen.queryByText("1")).toBeNull();
});

test("counter increments when I click", () => {
  render(<Counter />);
  fireEvent.click(screen.getByText(/Click me/i));
  expect(screen.queryByText("0")).toBeNull();
  expect(screen.queryByText("1")).not.toBeNull();
});
