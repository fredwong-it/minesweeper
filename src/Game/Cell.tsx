import React from "react";
import { Box } from "@mui/material";
import { isOpenedCell } from "./game.utils";

interface CellProps {
  id: string;
  key: string | number;
  children: any;
}

const Cell = ({ id, key, children }: CellProps) => (
  <Box
    id={id}
    key={key}
    sx={{
      display: "inline-block",
      fontSize: "35px",
      width: "40px",
      height: "40px",
      cursor: "pointer",
      ...(isOpenedCell(children) && {
        cursor: "not-allowed",
      }),
    }}
  >
    {children}
  </Box>
);

export default Cell;
