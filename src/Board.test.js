import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

test("renders the starter Board", () => {
  const { asFragment } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn={0.5} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("handles cell clicking", () => {
  const { getAllByRole } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn={1.0} />
  );

  // Get all cells
  const cells = getAllByRole("cell");

  // Initial state: all cells are lit
  cells.forEach((cell) => expect(cell).toHaveClass("Cell-lit"));

  // Click the center cell (1-1)
  fireEvent.click(cells[4]); // cells are in row-major order: [0][0], [0][1], [0][2], [1][0], [1][1], ...

  // Check the expected state changes after the click
  const expectedLitStatus = [
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ];

  expectedLitStatus.forEach((isLit, idx) => {
    if (isLit) {
      expect(cells[idx]).toHaveClass("Cell-lit");
    } else {
      expect(cells[idx]).not.toHaveClass("Cell-lit");
    }
  });
});

test('shows "You won!" message', () => {
  const { getByText, queryByText, getAllByRole } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn={1.0} />
  );

  // Click all cells to turn them off
  const cells = getAllByRole("cell");
  cells.forEach((cell) => fireEvent.click(cell));

  // There should be no win message initially
  expect(queryByText("You Won!")).not.toBeInTheDocument();

  // Click the cells again to turn off all lights
  cells.forEach((cell) => fireEvent.click(cell));

  // Check for win message
  expect(getByText("You Won!")).toBeInTheDocument();
});
