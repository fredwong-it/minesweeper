import React from "react";
import { Button, Popover } from "@mui/material";
import classNames from "classnames";
import { GAME_STATUS, CELL } from "./game.utils";
import Cell from "./Cell";
import {
  startGameApp,
  startGame,
  getMap,
  openCell,
  updateMap,
} from "../redux/actions/game.action";
import { useSelector, useDispatch } from "react-redux";

import "./game.css";

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

    if (
      status === GAME_STATUS.IN_PROGRESS &&
      [CELL.INIT, CELL.FLAG].includes(map[id.rowIndex][id.columnIndex])
    ) {
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

  const boardClasses = classNames("c-game-board", {
    disabled: [GAME_STATUS.WIN, GAME_STATUS.LOSE].includes(status),
  });
  const open = Boolean(anchorEl);

  return (
    <div className="c-game">
      <div className="c-game-status">Game status: {status}</div>
      <div className={boardClasses} onClick={handleClick}>
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
      </div>
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
        <div className="c-game-cell-options">
          <Button onClick={handleOpen}>Open</Button>
          <Button onClick={handleFlag}>Flag</Button>
        </div>
      </Popover>
    </div>
  );
};

export default Game;
