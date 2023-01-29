import { useState } from "react";
import Square from "./Square";
const TURNS = {
  X: "X",
  O: "O",
};

const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardCheck) => {
    for (const iterator of WINNER_COMBINATIONS) {
      console.log("iter", iterator);
      const [a, b, c] = iterator;
      if (boardCheck[a] === boardCheck[b] && boardCheck[a] === boardCheck[c]) {
        return boardCheck[a];
      }
    }
    return null;
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return; //si la posicion del tablero esta ocupada no se puede hacer nada

    const newBoard = [...board];
    console.log(newBoard);
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);

      alert(`El ganador es ${newWinner}`);
    }
  };

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          <span>{TURNS.X}</span>
        </Square>
        <Square isSelected={turn == TURNS.O}>
          <span>{TURNS.O}</span>
        </Square>
      </section>
    </main>
  );
}

export default App;
