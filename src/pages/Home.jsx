// src/pages/Home.jsx
import '../styles/home.css';

const subtitles = [
  "Challenge accepted!",
  "You think you can beat the game?",
  "React or die!",
  "Built with Vite ⚡"
];

const Home = ({ onPlay }) => {
  const subtitle = subtitles[Math.floor(Math.random() * subtitles.length)];

  return (
    <div className="menu-container">
      <h1 className="menu-title">Survive React</h1>
      <p className="menu-subtitle">{subtitle}</p>
      <button className="menu-button" onClick={onPlay}>Play</button>
      <button className="menu-button" onClick={() => alert("Créé par Viel Rudy]")}>Credits</button>
      <p className="menu-version">v0.0.1</p>
    </div>
  );
};

export default Home;
