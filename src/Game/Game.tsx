import React from "react";
import { Button, Popover, Box } from "@mui/material";
import { GAME_STATUS, CELL, isOpenedCell } from "./game.utils";
import Cell from "./Cell";
import {
  startGameApp,
  startGame,
  getMap,
  openCell,
  updateMap,
} from "../redux/actions/game.action";
import { useSelector, useDispatch } from "react-redux";

const Game = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const dispatch = useDispatch();
  const map = useSelector((state: any) => state.game.map);
  const status = useSelector((state: any) => state.game.status);

  React.useEffect(() => {
    dispatch(startGameApp());
  }, []);

  const handleStart = () => {
    dispatch(startGame());
    dispatch(getMap());
  };

  const handleClick = (event: any) => {
    const id = JSON.parse(event.target.id);
    const cell = map[id.rowIndex][id.columnIndex];

    if (status === GAME_STATUS.IN_PROGRESS && !isOpenedCell(cell)) {
      setAnchorEl(event.target);
    }
  };

  const handleOpen = () => {
    if (anchorEl) {
      const id = JSON.parse(anchorEl.id);
      dispatch(openCell(id.rowIndex, id.columnIndex));
      dispatch(getMap());

      handleClose();
    }
  };

  const handleFlag = () => {
    if (anchorEl) {
      const id = JSON.parse(anchorEl.id);
      const newMap = [...map];
      newMap[id.rowIndex][id.columnIndex] = CELL.FLAG;

      dispatch(updateMap(newMap));

      handleClose();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const boardClasses = classNames("c-game-board", {
  //   disabled: [GAME_STATUS.WIN, GAME_STATUS.LOSE].includes(status),
  // });
  const open = Boolean(anchorEl);
  const isEndGame = status === GAME_STATUS.WIN || status === GAME_STATUS.LOSE;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          fontSize: "32px",
          margin: "20px 0px",
        }}
      >
        Game status: {status}
      </Box>
      <Box
        sx={{
          height: "450px",
          ...(isEndGame && {
            pointerEvents: "none",
            opacity: "0.4",
          }),
        }}
        onClick={handleClick}
      >
        {!!map &&
          map.map((row: [], rowIndex: number) => {
            return (
              <div key={rowIndex}>
                {row.map((column: string, columnIndex: number) => {
                  const id = JSON.stringify({ rowIndex, columnIndex });

                  return (
                    <Cell id={id} key={columnIndex}>
                      {column}
                    </Cell>
                  );
                })}
              </div>
            );
          })}
      </Box>
      <Button
        onClick={handleStart}
        disabled={status === GAME_STATUS.IN_PROGRESS}
      >
        Start Game
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button sx={{ textTransform: "capitalize" }} onClick={handleOpen}>
            Open
          </Button>
          <Button sx={{ textTransform: "capitalize" }} onClick={handleFlag}>
            Flag
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default Game;
