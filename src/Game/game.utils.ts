export const GAME_STATUS = {
  NOT_START: "Not start",
  IN_PROGRESS: "In progress",
  WIN: "Win",
  LOSE: "Lose",
};

export const CELL = {
  INIT: "□",
  FLAG: "🚩",
};

export const isOpenedCell = (cell: string) => {
  return cell !== CELL.INIT && cell !== CELL.FLAG;
};

export const isGameEnd = (status: string) =>
  status === GAME_STATUS.WIN || status === GAME_STATUS.LOSE;

export const canOpenAndFlag = (status: string, cell: string) => {
  return status === GAME_STATUS.IN_PROGRESS && !isOpenedCell(cell);
};

export const updateNewMap = (prevMap: string[][], newMap: string[][]) => {
  if (prevMap.length > 0) {
    for (let y = 0; y < prevMap.length; y++) {
      for (let x = 0; x < prevMap[0].length; x++) {
        if (prevMap[y][x] === CELL.FLAG) {
          newMap[y][x] = prevMap[y][x];
        }
      }
    }
  }

  return newMap;
};

export const cloneMap = (map: string[][]) =>
  map.map((row: string[]) => row.map((column: string) => column));

export const flagOrUnflagCell = (
  map: string[][],
  rowIndex: number,
  columnIndex: number,
  flag: boolean
) => {
  const newMap = cloneMap(map);

  if (flag) {
    newMap[rowIndex][columnIndex] = CELL.FLAG;
  } else {
    newMap[rowIndex][columnIndex] = CELL.INIT;
  }

  return newMap;
};

export const isInitCell = (
  map: string[][],
  cellElement: HTMLElement | null
) => {
  if (cellElement) {
    const id = JSON.parse(cellElement.id);
    return map[id.rowIndex][id.columnIndex] === CELL.INIT;
  }

  return false;
};

export const isFlagCell = (
  map: string[][],
  cellElement: HTMLElement | null
) => {
  if (cellElement) {
    const id = JSON.parse(cellElement.id);
    return map[id.rowIndex][id.columnIndex] === CELL.FLAG;
  }

  return false;
};
