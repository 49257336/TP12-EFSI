import './App.css';
import { GameProvider } from './context/GameContext';
import Flag from './components/Flag';
import GuessForm from './components/GuessForm';
import Hint from './components/Hint';
import ScoreBoard from './components/ScoreBoard';
import Timer from './components/Timer';

function App() {
  return (
    <GameProvider>
      <main className="game-shell">
        <header className="game-status-header">
          <ScoreBoard />
          <Timer />
          <Hint />
        </header>
        <section className="game-layout">
          <div className="play-area">
            <div className="intro">
              <p className="eyebrow">ADIVINA LA BANDERA</p>
              <h1>¿De dónde es<br />esta bandera?</h1>
            </div>
            <Flag />
            <GuessForm />
          </div>
        </section>
      </main>
    </GameProvider>
  );
}

export default App
