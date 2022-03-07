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
