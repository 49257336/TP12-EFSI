import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { GameProvider } from "./context/GameContext";
import { getFlags } from './api'

function App() {
  const [flags, setFlags] = useState([]);
   useEffect(() => {
     setFlags(getFlags);
     });
  return (
    <GameProvider>
      <Flag />
      <GuessForm />
      <ScoreBoard />
      <Timer />
    </ GameProvider>
  );
}

export default App
