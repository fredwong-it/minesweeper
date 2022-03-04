import React, { Fragment } from "react";
import classNames from "classnames";
import { CELL } from "./game.utils";

import "./cell.css";

interface CellProps {
  id: string;
  key: string | number;
  children: any;
}

const Cell = ({ id, key, children }: CellProps) => {
  const classes = classNames("c-game-cell", {
    "c-game-cell-opened": ![CELL.INIT, CELL.FLAG].includes(children)
  });

  return (
    <Fragment>
      <span id={id} key={key} className={classes}>
        {children}
      </span>
    </Fragment>
  );
};

export default Cell;
