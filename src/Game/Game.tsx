import React from "react";
import { Button } from "@mui/material";
import classNames from "classnames";
import { GAME_STATUS } from "./game.utils";

import "./game.css";

const initSpot = "□";
const client = new WebSocket("wss://hometask.eg1236.com/game1/");

const Game = () => {
  const [status, setStatus] = React.useState<string>(GAME_STATUS.NOT_START);
  const [map, setMap] = React.useState<[]>([]);

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

        if (map.length === 0) {
          setMap(newMap);
        } else {
          for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map.length; x++) {
              if (newMap[y][x] === initSpot) {
                newMap[y][x] = map[y][x];
              }
            }
          }

          setMap(newMap);
        }
      } else if (data.indexOf("open: ") > -1) {
        const result = data.replace("open: ", "");

        if (result === "You lose") {
          setStatus(GAME_STATUS.LOSE);
        }

        console.log({ result });
      }
    };

    //clean up function
    return () => client.close();
  }, []);

  const handleStart = () => {
    setStatus(GAME_STATUS.IN_PROGRESS);
    client.send("new 1");
    client.send("map");
  };

  const handleClick = (event: any) => {
    if (status === GAME_STATUS.IN_PROGRESS) {
      const id = JSON.parse(event.target.id);

      if (map[id.rowIndex][id.columnIndex] === initSpot) {
        client.send(`open ${id.columnIndex} ${id.rowIndex}`);
        client.send("map");
      }
    }
  };

  const boardClasses = classNames("c-game-board", {
    disabled: [GAME_STATUS.WIN, GAME_STATUS.LOSE].includes(status),
  });

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
                  const classes = classNames("c-game-cell", {
                    "c-game-cell-init": column === initSpot,
                  });

                  return (
                    <span id={id} key={columnIndex} className={classes}>
                      {column}
                    </span>
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
    </div>
  );
};

export default Game;
