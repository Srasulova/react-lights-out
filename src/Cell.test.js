import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

test("renders a cell properly", () => {
  const { container } = render(
    <table>
      <tbody>
        <tr>
          <Cell isLit={true} flipCellsAroundMe={() => {}} />
        </tr>
      </tbody>
    </table>
  );
  expect(container.querySelector("td")).toHaveClass("Cell Cell-lit");

  const { container: unlitContainer } = render(
    <table>
      <tbody>
        <tr>
          <Cell isLit={false} flipCellsAroundMe={() => {}} />
        </tr>
      </tbody>
    </table>
  );
  expect(unlitContainer.querySelector("td")).toHaveClass("Cell");
  expect(unlitContainer.querySelector("td")).not.toHaveClass("Cell-lit");
});
