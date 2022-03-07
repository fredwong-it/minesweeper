import { gameType } from "../types";
import { Action, GameState } from "../interface";
import {
  GAME_STATUS,
  updateNewMap,
  flagOrUnflagCell,
} from "../../Game/game.utils";

const initialState: GameState = {
  status: GAME_STATUS.NOT_START,
  map: [],
};

export default function game(state: GameState = initialState, action: Action) {
  const { type, payload } = action;
  const { map } = state;
  let newMap;

  switch (type) {
    case gameType.START_GAME:
      return {
        ...state,
        status: GAME_STATUS.IN_PROGRESS,
        map: [],
      };
    case gameType.UPDATE_MAP:
      newMap = updateNewMap(map, payload.map);

      return {
        ...state,
        map: newMap,
      };
    case gameType.FLAG_CELL:
      newMap = flagOrUnflagCell(
        map,
        payload.rowIndex,
        payload.columnIndex,
        true
      );

      return {
        ...state,
        map: newMap,
      };
    case gameType.UNFLAG_CELL:
      newMap = flagOrUnflagCell(
        map,
        payload.rowIndex,
        payload.columnIndex,
        false
      );

      return {
        ...state,
        map: newMap,
      };
      break;
    case gameType.WIN_GAME:
      return {
        ...state,
        status: GAME_STATUS.WIN,
      };
    case gameType.LOSE_GAME:
      return {
        ...state,
        status: GAME_STATUS.LOSE,
      };
    default:
      return state;
  }
}
