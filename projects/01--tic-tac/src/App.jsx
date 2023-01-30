import { useState } from "react";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkEndGame, checkWinner } from "./logic/checks";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  const [board, setBoard] = useState(() => {
    const board = sessionStorage.getItem("board");
    if (board) return JSON.parse(board);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turn = sessionStorage.getItem("turn");
    return turn ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return; //si la posicion del tablero esta ocupada no se puede hacer nada

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    sessionStorage.setItem("board", JSON.stringify(newBoard));
    sessionStorage.setItem("turn", newTurn);
    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    sessionStorage.clear();
  };

  return (
    <main className="board">
      <button onClick={() => resetGame()}>Reiniciar</button>
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
      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  );
}

export default App;
