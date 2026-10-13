import { createContext, createElement, useCallback, useContext, useEffect, useState } from 'react';
import { getFlags } from '../api';

const GameContext = createContext(null);
const ROUND_SECONDS = 30;

export function GameProvider({ children }) {
	const [countries, setCountries] = useState([]);
	const [currentCountry, setCurrentCountry] = useState(null);
	const [score, setScore] = useState(0);
	const [players, setPlayers] = useState([{ id: 'player-1', name: 'Jugador 1' }]);
	const [timer, setTimer] = useState(ROUND_SECONDS);
	const [hint, setHint] = useState('');
	const [feedback, setFeedback] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		let cancelled = false;

		getFlags()
			.then((results) => {
				if (cancelled) return;
				const availableCountries = results.toSorted((first, second) =>
					first.name.localeCompare(second.name),
				);
				setCountries(availableCountries);
				const firstCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)];
				setCurrentCountry(firstCountry);
			})
			.catch(() => {
				if (!cancelled) setError('No se pudieron cargar las banderas. Intenta recargar la página.');
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	const nextCountry = useCallback(() => {
		if (countries.length === 0) return;

		const choices = countries.filter((country) => country.name !== currentCountry?.name);
		const pool = choices.length > 0 ? choices : countries;
		const next = pool[Math.floor(Math.random() * pool.length)];
		setCurrentCountry(next);
		setTimer(ROUND_SECONDS);
		setHint('');
	}, [countries, currentCountry]);

	const guess = useCallback((answer) => {
		if (!currentCountry || !answer.trim()) return false;

		const normalize = (value) => value
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLocaleLowerCase();

		if (normalize(answer.trim()) === normalize(currentCountry.name)) {
			setScore((currentScore) => currentScore + 10);
			nextCountry();
			setFeedback(`¡Correcto! Era ${currentCountry.name}. +10 puntos`);
			return true;
		}

		setScore((currentScore) => currentScore - 1);
		setFeedback('No es ese país. Prueba otra vez. -1 punto');
		return false;
	}, [currentCountry, nextCountry]);

	const revealHint = useCallback(() => {
		if (!currentCountry) return;
		setHint((previousHint) => {
			const characters = [...currentCountry.name];
			const isLetter = (character) => /\p{L}/u.test(character);
			const revealedCount = previousHint
				? [...previousHint].filter((character) => isLetter(character) && character !== '•').length
				: 0;
			let lettersToReveal = revealedCount + 1;

			return characters.map((character) => {
				if (!isLetter(character)) return character;
				if (lettersToReveal > 0) {
					lettersToReveal -= 1;
					return character;
				}
				return '•';
			}).join('');
		});
	}, [currentCountry]);

	useEffect(() => {
		if (!currentCountry || loading || error) return undefined;

		const timeout = window.setTimeout(() => {
			if (timer <= 1) {
				setScore((currentScore) => currentScore - 1);
				setFeedback(`Se acabó el tiempo. Era ${currentCountry.name}. -1 punto`);
				nextCountry();
			} else {
				setTimer(timer - 1);
			}
		}, 1000);

		return () => window.clearTimeout(timeout);
	}, [currentCountry, error, loading, nextCountry, timer]);

	return createElement(GameContext.Provider, {
		value: {
			countries,
			currentCountry,
			score,
			players,
			setPlayers,
			timer,
			hint,
			feedback,
			loading,
			error,
			guess,
			nextCountry,
			revealHint,
		},
	}, children);
}

export function useGame() {
	const game = useContext(GameContext);
	if (!game) throw new Error('useGame debe usarse dentro de GameProvider.');
	return game;
}