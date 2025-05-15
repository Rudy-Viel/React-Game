// src/App.jsx
import { useState } from 'react';
import Home from './pages/Home';
import Game from './pages/Game';

function App() {
  const [screen, setScreen] = useState('menu'); // 'menu' ou 'game'

  return (
    <>
      {screen === 'menu' ? (
        <Home onPlay={() => setScreen('game')} />
      ) : (
        <Game />
      )}
    </>
  );
}

export default App;
