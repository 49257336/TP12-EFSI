import { useGame } from '../context/GameContext';
import './Hint.css';

function Hint() {
	const { currentCountry, error, hint, loading, revealHint } = useGame();
	const hintComplete = hint && !hint.includes('•');

	return (
		<section className="hint-widget" aria-label="Pista">
			<button
				className="hint-button"
				type="button"
				onClick={revealHint}
				disabled={!currentCountry || loading || Boolean(error) || hintComplete}
			>
				<span aria-hidden="true">＋</span> Pista
			</button>
			{hint && <p className="hint-text" aria-live="polite">Completa: <strong>{hint}</strong></p>}
		</section>
	);
}

export default Hint;