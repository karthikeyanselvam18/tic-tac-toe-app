import { useEffect, useState } from "react";
import { Menu } from "./Menu";
import { Score } from "./Score";

export interface IGameBoardProps {}

export function GameBoard() {
  const [squares, setSquares] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [score, setScore] = useState<{
    player1: number;
    ties: number;
    player2: number;
  }>({
    player1: 0,
    ties: 0,
    player2: 0,
  });
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [gameOver, setGameOver] = useState<boolean>(false);

  const squareElements = squares.map((square: string, index: number) => {
    let symbol: JSX.Element | null = null;
    if (square === "X") {
      symbol = <i className="fa-solid fa-xmark text-blue"></i>;
    } else if (square === "O") {
      symbol = <i className="fa-solid fa-o text-yellow"></i>;
    }
    return (
      <div
        key={index}
        className="square"
        onClick={() => handleSquareClick(index)}
      >
        {symbol}
      </div>
    );
  });
  const [modalMessage, setModalMessage] = useState<string>("");

  let modalStyle = gameOver ? { display: "flex" } : { display: "none" };
  let overlayStyle = gameOver ? { display: "block" } : { display: "none" };

  useEffect(() => {
    if (!gameOver) {
      checkWinner();
    }
  }, [squares, gameOver]);

  function handleSquareClick(index: number) {
    if (squares[index] === "" && !gameOver) {
      let updatedSquares = [...squares];
      updatedSquares[index] = currentPlayer;
      setSquares(updatedSquares);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  function checkWinner() {
    const winningCombos: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        if (squares[a] === "X") {
          setScore((prev) => ({
            ...prev,
            player1: prev.player1 + 1,
          }));
          setModalMessage("Player 1 win");
        } else {
          setScore((prev) => ({
            ...prev,
            player2: prev.player2 + 1,
          }));
          setModalMessage("Player 2 win");
        }
        setGameOver(true);
        return;
      }
    }
    checkTie();
  }

  function checkTie() {
    if (squares.every((square: string) => square !== "") && !gameOver) {
      setScore((prev) => ({ ...prev, ties: prev.ties + 1 }));
      setModalMessage("Tie!");
      setGameOver(true);
    }
  }

  function resetGame() {
    setSquares(["", "", "", "", "", "", "", "", ""]);
    setCurrentPlayer("X");
  }

  function resetRound() {
    setSquares(["", "", "", "", "", "", "", "", ""]);
    setScore({
      player1: 0,
      ties: 0,
      player2: 0,
    });
    setCurrentPlayer("X");
  }

  function playAgain() {
    setSquares(["", "", "", "", "", "", "", "", ""]);
    setGameOver(false);
  }

  return (
    <>
      <div className="grid">
        <Menu
          currentPlayer={currentPlayer}
          resetGame={resetGame}
          resetRound={resetRound}
        />
        {squareElements}
        <Score score={score} />
      </div>{" "}
      <div className="overlay" style={overlayStyle}></div>
      <div className="modal" style={modalStyle}>
        <span>{modalMessage}</span>
        <button onClick={playAgain}>Play again!</button>
      </div>
    </>
  );
}
