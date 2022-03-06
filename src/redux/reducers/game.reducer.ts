import { gameType } from "../types";
import { Action, GameState } from "../interface";
import { GAME_STATUS, CELL } from "../../Game/game.utils";

const initialState: GameState = {
  status: "",
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
      const newMap = payload.map;

      if (map.length > 0) {
        for (let y = 0; y < map.length; y++) {
          for (let x = 0; x < map.length; x++) {
            if (newMap[y][x] === CELL.INIT) {
              newMap[y][x] = map[y][x];
            }
          }
        }
      }

      return {
        ...state,
        map: newMap,
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
