import React from "react";
import { Square } from "./Square";
export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;
  const message = winner ? `El ganador es ${winner}` : "Empate";
  return (
    <section className="winner">
      <div className="text">
        <h2>{message}</h2>
      </div>
      <header className="win">{winner && <Square>{winner}</Square>}</header>
      <footer>
        <button onClick={() => resetGame()}>Reiniciar</button>
      </footer>
    </section>
  );
}
