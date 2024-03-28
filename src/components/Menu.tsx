import { useState } from "react";

export interface IMenuProps {
  currentPlayer: string;
  resetGame: () => void;
  resetRound: () => void;
}

export function Menu(props: IMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPlayerIcon =
    props.currentPlayer === "X" ? (
      <i className="fa-solid fa-x"></i>
    ) : (
      <i className="fa-solid fa-o"></i>
    );
  const currentPlayerNumber = props.currentPlayer === "X" ? 1 : 2;
  const turnStyle = {
    color:
      props.currentPlayer === "X" ? "var(--picton-blue)" : "var(--sunglow)",
  };
  const menuStyle = {
    scale: isMenuOpen ? "1 1" : "1 0",
  };

  function handleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <>
      <div className="turn" style={turnStyle}>
        {currentPlayerIcon}
        <span>Player {currentPlayerNumber} turn</span>
      </div>
      <div className="dropdown">
        <button id="menu-button" onClick={handleMenu}>
          Action <i className="fa-solid fa-chevron-down"></i>
        </button>
        <div className="menu-items" style={menuStyle}>
          <button onClick={props.resetGame}>Reset</button>
          <button onClick={props.resetRound}>New Round</button>
        </div>
      </div>
    </>
  );
}
