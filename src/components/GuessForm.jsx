import { useState } from 'react';
import { useGame } from '../context/GameContext';
import './GuessForm.css';

function normalizeCountryName(name) {
	return name
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLocaleLowerCase();
}

function GuessForm() {
	const [answer, setAnswer] = useState('');
	const { countries, feedback, guess, loading, error } = useGame();
	const normalizedAnswer = normalizeCountryName(answer.trim());
	const suggestions = normalizedAnswer
		? countries.filter((country) => normalizeCountryName(country.name).includes(normalizedAnswer))
			.toSorted((first, second) => Number(
				!normalizeCountryName(first.name).startsWith(normalizedAnswer),
			) - Number(
				!normalizeCountryName(second.name).startsWith(normalizedAnswer),
			))
		: [];

	const handleSubmit = (event) => {
		event.preventDefault();
		if (guess(answer)) setAnswer('');
	};

	return (
		<div className="guess-area">
			<form className="guess-form" onSubmit={handleSubmit}>
				<label className="guess-prompt" htmlFor="country-guess">ESCRIBE O SELECCIONA EL PAÍS</label>
				<div className="guess-controls">
					<input
						className="guess-input"
						id="country-guess"
						list="country-suggestions"
						value={answer}
						onChange={(event) => setAnswer(event.target.value)}
						placeholder="Nombre del país"
						autoComplete="off"
						disabled={loading || Boolean(error)}
					/>
					<datalist id="country-suggestions">
						{suggestions.map((country) => <option key={country.name} value={country.name} />)}
					</datalist>
					<button className="guess-submit" type="submit" disabled={loading || Boolean(error) || !answer.trim()}>
						Responder <span aria-hidden="true">↗</span>
					</button>
				</div>
			</form>
			<div className="guess-meta">
				<p className="feedback" aria-live="polite">{feedback}</p>
			</div>
		</div>
	);
}

export default GuessForm;
