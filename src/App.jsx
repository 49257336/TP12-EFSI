import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

  return (
    <GameProvider>
      <Flag />
      <GuessForm />
      <ScoreBoard />
      <Timer />
    <GameProvider />
  );
}

export default App
