import { useGame } from '../context/GameContext';
import './Flag.css';

function Flag() {
  const { currentCountry, loading, error } = useGame();

  return (
    <div className="flag-stage" aria-live="polite">
      {loading && <p className="stage-message">Preparando el mapa…</p>}
      {error && <p className="stage-message error-message">{error}</p>}
      {!loading && !error && currentCountry && (
        <img className="country-flag" src={currentCountry.flag} alt="Bandera para adivinar" />
      )}
      <span className="stage-index" aria-hidden="true">01 / ?</span>
    </div>
  );
}

export default Flag