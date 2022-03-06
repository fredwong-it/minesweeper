export interface Action {
  type: string;
  payload: any;
}

export interface GameState {
  status: string;
  map: string[][];
}
