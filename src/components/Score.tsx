export interface IScoreProps {
  score: {
    player1: number;
    ties: number;
    player2: number;
  };
}

export function Score(props: IScoreProps) {
  return (
    <>
      <div className="score player-1">
        <span className="score-title">Player 1</span>
        <span>{props.score.player1} wins</span>
      </div>
      <div className="score ties">
        <span className="score-title">Ties</span>
        <span>{props.score.ties}</span>
      </div>
      <div className="score player-2">
        <span className="score-title">Player 2</span>
        <span>{props.score.player2} wins</span>
      </div>
    </>
  );
}
