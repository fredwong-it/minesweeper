import { gameType } from "../types";
import { Action, GameState } from "../interface";
import { GAME_STATUS, cloneMap, updateNewMap } from "../../Game/game.utils";

const initialState: GameState = {
  status: GAME_STATUS.NOT_START,
  map: [],
};

export default function game(state: GameState = initialState, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case gameType.START_GAME:
      return {
        ...state,
        status: GAME_STATUS.IN_PROGRESS,
        map: [],
      };
    case gameType.UPDATE_MAP:
      const { map } = state;
      const newMap = updateNewMap(map, payload.map);

      return {
        ...state,
        map: cloneMap(newMap),
      };
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
