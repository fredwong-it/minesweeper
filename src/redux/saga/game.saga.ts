import { call, put, take, takeEvery, select } from "redux-saga/effects";
import { eventChannel, END, EventChannel } from "redux-saga";
import { gameType } from "../types";
import { Action } from "../interface";

const webSocketUrl = "wss://hometask.eg1236.com/game1/";

function createWebSocketConnection() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(webSocketUrl);

    socket.onopen = function () {
      console.log("opening...");
      socket.send("help");
      resolve(socket);
    };

    socket.onerror = function (evt) {
      reject(evt);
    };
  });
}

function createSocketChannel(socket: WebSocket) {
  return eventChannel((emit) => {
    socket.onmessage = (event) => {
      const { data } = event;

      if (data.indexOf("map:") > -1) {
        let newMap = data.split("\n").slice(1);
        newMap.pop();
        newMap = newMap.map((o: string) => o.split(""));

        emit({
          type: gameType.UPDATE_MAP,
          payload: {
            map: newMap,
          },
        });
      } else if (data.indexOf("open: ") > -1) {
        const result = data.replace("open: ", "");

        if (result === "You lose") {
          emit({
            type: gameType.LOSE_GAME,
          });
        } else if (result.includes("You win")) {
          emit({
            type: gameType.WIN_GAME,
          });
        }
      }
    };

    socket.onclose = () => {
      emit(END);
    };

    const unsubscribe = () => {
      socket.onmessage = null;
    };

    // unsubscribe function
    return unsubscribe;
  });
}

function* gameSaga() {
  let socket: WebSocket;
  let socketChannel: EventChannel<Action>;

  socket = yield call(createWebSocketConnection);
  socketChannel = yield call(createSocketChannel, socket);

  yield takeEvery(gameType.START_GAME, () => {
    socket.send("new 1");
  });

  yield takeEvery(gameType.GET_MAP, () => {
    socket.send("map");
  });

  yield takeEvery(gameType.OPEN_CELL, ({ payload }: Action) => {
    socket.send(`open ${payload.columnIndex} ${payload.rowIndex}`);
  });

  while (true) {
    const action: Action = yield take(socketChannel);
    yield put(action);
  }
}

export function* watchGameSaga() {
  yield takeEvery(gameType.START_GAME_APP, gameSaga);
}
