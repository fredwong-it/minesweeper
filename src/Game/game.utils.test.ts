import {
  isOpenedCell,
  isGameEnd,
  canOpenAndFlag,
  updateNewMap,
  cloneMap,
  GAME_STATUS,
  CELL,
  getCellContent,
} from "./game.utils";

describe("Game utils test", () => {
  describe("isOpenedCell", () => {
    it("should return true", () => {
      // Given

      // When
      const result1 = isOpenedCell("1");
      const result2 = isOpenedCell("0");

      // Then
      expect(result1).toEqual(true);
      expect(result2).toEqual(true);
    });

    it("should return false", () => {
      // Given

      // When
      const result1 = isOpenedCell(CELL.INIT);
      const result2 = isOpenedCell(CELL.FLAG);

      // Then
      expect(result1).toEqual(false);
      expect(result2).toEqual(false);
    });
  });

  describe("isGameEnd", () => {
    it("should return result true", () => {
      // Given

      // When
      const result1 = isGameEnd(GAME_STATUS.WIN);
      const result2 = isGameEnd(GAME_STATUS.LOSE);

      // Then
      expect(result1).toEqual(true);
      expect(result2).toEqual(true);
    });

    it("should return resultfalse", () => {
      // Given

      // When
      const result1 = isGameEnd(GAME_STATUS.NOT_START);
      const result2 = isGameEnd(GAME_STATUS.IN_PROGRESS);

      // Then
      expect(result1).toEqual(false);
      expect(result2).toEqual(false);
    });
  });

  describe("canOpenAndFlag", () => {
    it("should return result true", () => {
      // Given

      // When
      const result1 = canOpenAndFlag(GAME_STATUS.IN_PROGRESS, CELL.INIT);

      // Then
      expect(result1).toEqual(true);
    });

    it("should return result false", () => {
      // Given

      // When
      const result1 = canOpenAndFlag(GAME_STATUS.WIN, CELL.INIT);
      const result2 = canOpenAndFlag(GAME_STATUS.IN_PROGRESS, "1");

      // Then
      expect(result1).toEqual(false);
      expect(result2).toEqual(false);
    });
  });

  describe("updateNewMap", () => {
    it("should update return the new map with flag from previous map", () => {
      // Given
      const prevMap = [
        [CELL.INIT, CELL.INIT, CELL.INIT],
        [CELL.FLAG, CELL.INIT, CELL.INIT],
        [CELL.INIT, CELL.INIT, CELL.FLAG],
      ];
      const newMap = [
        ["1", "2", "3"],
        [CELL.INIT, CELL.INIT, CELL.INIT],
        [CELL.INIT, CELL.INIT, CELL.INIT],
      ];

      // When
      const resultMap = updateNewMap(prevMap, newMap);

      // Then
      expect(resultMap[1][0]).toEqual(CELL.FLAG);
      expect(resultMap[2][2]).toEqual(CELL.FLAG);
      // check not the same map object
      expect(resultMap).not.toBe(newMap);
      expect(resultMap[0]).not.toBe(newMap[0]);
    });
  });

  describe("cloneMap", () => {
    it("should be not the same object ", () => {
      // Given
      const map = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
      ];

      // When
      const newMap = cloneMap(map);

      // Then
      expect(newMap).not.toBe(map);
      expect(newMap[0]).not.toBe(map[0]);
      expect(newMap[0][0]).toBe(map[0][0]);
    });

    it("should be the same object in one level down the array ", () => {
      // Given
      const map = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
      ];

      // When
      const newMap = [...map];

      // Then
      expect(newMap).not.toBe(map);
      expect(newMap[0]).toBe(map[0]);
      expect(newMap[0][0]).toBe(map[0][0]);
    });
  });
});

describe("getCellContent", () => {
  const map = [
    [CELL.INIT, "2", CELL.FLAG],
    ["4", CELL.INIT, "6"],
    ["7", "8", CELL.FLAG],
  ];

  it("should return all results correctly", () => {
    // Given

    // When
    const cellContent1 = getCellContent(map, `{"rowIndex":0,"columnIndex":0}`);
    const cellContent2 = getCellContent(map, `{"rowIndex":1,"columnIndex":1}`);
    const cellContent3 = getCellContent(map, `{"rowIndex":0,"columnIndex":2}`);
    const cellContent4 = getCellContent(map, `{"rowIndex":2,"columnIndex":2}`);
    const cellContent5 = getCellContent(map, `{"rowIndex":0,"columnIndex":1}`);

    // Then
    expect(cellContent1).toEqual(CELL.INIT);
    expect(cellContent2).toEqual(CELL.INIT);
    expect(cellContent3).toEqual(CELL.FLAG);
    expect(cellContent4).toEqual(CELL.FLAG);
    expect(cellContent5).toEqual("2");
  });
});
