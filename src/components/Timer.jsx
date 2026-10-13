import { useGame } from '../context/GameContext';
import './Timer.css';

function Timer() {
  const { timer } = useGame();
  const progress = `${(timer / 30) * 100}%`;

  return (
    <section className="timer-panel" aria-label="Tiempo restante">
      <div className="timer-heading">
        <p className="eyebrow">TIEMPO RESTANTE</p>
        <p className="timer-value" aria-live="polite">00:{String(timer).padStart(2, '0')}</p>
      </div>
      <div className="timer-track" role="progressbar" aria-valuemin="0" aria-valuemax="30" aria-valuenow={timer}>
        <span style={{ width: progress }} />
      </div>
      <p className="timer-caption">Responde antes de que termine la ronda.</p>
    </section>
  );
}

export default Timer;