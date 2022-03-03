import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import classNames from "classnames";

const initSpot = "□";
const client = new WebSocket("wss://hometask.eg1236.com/game1/");

function App() {
  const [map, setMap] = React.useState<[]>([]);

  React.useEffect(() => {
    client.onopen = (event) => {
      console.log("open");
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
        console.log({ result });
      }
    };

    //clean up function
    return () => client.close();
  }, []);

  const handleStart = () => {
    client.send("new 1");
    client.send("map");
  };

  const handleClick = (event: any) => {
    const id = JSON.parse(event.target.id);

    if (map[id.rowIndex][id.columnIndex] === initSpot) {
      client.send(`open ${id.columnIndex} ${id.rowIndex}`);
      client.send("map");
    }
  };

  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <main onClick={handleClick}>
        {!!map &&
          map.map((row: [], rowIndex: number) => {
            return (
              <div key={rowIndex}>
                {row.map((column: string, columnIndex: number) => {
                  const id = JSON.stringify({ rowIndex, columnIndex });
                  const classes = classNames("c-cell", {
                    "c-cell-init": column === initSpot,
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
      </main>
      <Button onClick={handleStart}>Start</Button>
    </div>
  );
}

export default App;
