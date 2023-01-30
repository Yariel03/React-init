import { WINNER_COMBINATIONS } from "./../constants";

export function checkWinner(boardCheck) {
  for (const iterator of WINNER_COMBINATIONS) {
    const [a, b, c] = iterator;
    if (boardCheck[a] === boardCheck[b] && boardCheck[a] === boardCheck[c]) {
      return boardCheck[a];
    }
  }
  return null;
}

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
