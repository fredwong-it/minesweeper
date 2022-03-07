import { gameType } from "../types";

export function startGameApp() {
  return {
    type: gameType.START_GAME_APP,
  };
}

export function startGame() {
  return {
    type: gameType.START_GAME,
  };
}

export function getMap() {
  return {
    type: gameType.GET_MAP,
  };
}

export function updateMap(map: string[][]) {
  return {
    type: gameType.UPDATE_MAP,
    payload: {
      map,
    },
  };
}

export function flagCell(rowIndex: number, columnIndex: number) {
  return {
    type: gameType.FLAG_CELL,
    payload: {
      rowIndex,
      columnIndex,
    },
  };
}

export function unflagCell(rowIndex: number, columnIndex: number) {
  return {
    type: gameType.UNFLAG_CELL,
    payload: {
      rowIndex,
      columnIndex,
    },
  };
}

export function openCell(rowIndex: number, columnIndex: number) {
  return {
    type: gameType.OPEN_CELL,
    payload: {
      rowIndex,
      columnIndex,
    },
  };
}

export function winGame() {
  return {
    type: gameType.WIN_GAME,
  };
}

export function loseGame() {
  return {
    type: gameType.LOSE_GAME,
  };
}
