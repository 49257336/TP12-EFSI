import { useGame } from '../context/GameContext';
import './ScoreBoard.css';

function ScoreBoard() {
  const { score } = useGame();

  return (
    <section className="score-panel" aria-label="Puntaje">
      <div className="panel-heading">
        <p className="eyebrow">PUNTAJE</p>
      </div>
      <p className="score-value" aria-live="polite">{score}<span> pts</span></p>
    </section>
  );
}

export default ScoreBoard;