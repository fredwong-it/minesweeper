import React, { Fragment } from "react";
import classNames from "classnames";
import { Box } from "@mui/material";
import { isOpenedCell } from "./game.utils";

interface CellProps {
  id: string;
  key: string | number;
  children: any;
}

const Cell = ({ id, key, children }: CellProps) => {
  // const classes = classNames("c-game-cell", {
  //   "c-game-cell-opened": ![CELL.INIT, CELL.FLAG].includes(children),
  // });
  //const isOpenedCell = children !== CELL.INIT && children !== CELL.FLAG;
  const cell = children;

  return (
    <Fragment>
      <Box
        id={id}
        key={key}
        sx={{
          display: "inline-block",
          fontSize: "35px",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          ...(isOpenedCell(cell) && {
            cursor: "not-allowed",
          }),
        }}
      >
        {children}
      </Box>
    </Fragment>
  );
};

export default Cell;
