import React from "react";
import { Button, Popover } from "@mui/material";
import classNames from "classnames";
import { GAME_STATUS, CELL } from "./game.utils";
import Cell from "./Cell";

import "./game.css";

const client = new WebSocket("wss://hometask.eg1236.com/game1/");

const Game = () => {
  const [status, setStatus] = React.useState<string>(GAME_STATUS.NOT_START);
  const [map, setMap] = React.useState<string[][]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    client.onopen = () => {
      console.log("connected");
    };

    client.onmessage = (event) => {
      const { data } = event;

      if (data.indexOf("map:") > -1) {
        let newMap = data.split("\n").slice(1);
        newMap.pop();
        newMap = newMap.map((o: string) => o.split(""));

        setMap((prevMap) => {
          if (prevMap.length === 0) {
            return newMap;
          } else {
            for (let y = 0; y < prevMap.length; y++) {
              for (let x = 0; x < prevMap.length; x++) {
                if (newMap[y][x] === CELL.INIT) {
                  newMap[y][x] = prevMap[y][x];
                }
              }
            }

            return newMap;
          }
        });
      } else if (data.indexOf("open: ") > -1) {
        const result = data.replace("open: ", "");

        if (result === "You lose") {
          setStatus(GAME_STATUS.LOSE);
        } else if (result.includes("You win")) {
          setStatus(GAME_STATUS.WIN);
        }

        console.log({ result });
      }
    };

    //clean up function
    return () => client.close();
  }, []);

  const handleStart = () => {
    setStatus(GAME_STATUS.IN_PROGRESS);
    setMap([]);

    client.send("new 1");
    client.send("map");
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

      client.send(`open ${id.columnIndex} ${id.rowIndex}`);
      client.send("map");

      handleClose();
    }
  };

  const handleFlag = () => {
    if (anchorEl) {
      const id = JSON.parse(anchorEl.id);
      const newMap = [...map];
      newMap[id.rowIndex][id.columnIndex] = CELL.FLAG;

      setMap(newMap);

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
          map.map((row, rowIndex: number) => {
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
