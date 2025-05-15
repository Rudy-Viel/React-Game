import { useState, useEffect } from 'react';
import '../styles/game.css';
import ResourceBar from '../components/ResourceBar';
import QueteListe from '../components/QueteListe';
import Map from '../components/Map';
import Journal from '../components/Journal';

const Game = () => {
  const [resources, setResources] = useState({
    humans: { current: 1, max: 1 },
    food: 20,
    wood: 50,
    stone: 50,
  });

  const [quetes, setQuetes] = useState([
    { id: 1, titre: 'Construire une cabane', terminee: false, recompense: { wood: 10 } },
    { id: 2, titre: 'Récolter 10 bois', terminee: false, recompense: { food: 10 } },
    { id: 3, titre: 'Avoir 10 humain', terminee: false, recompense: { stone: 25 } }
  ]);

  const [journal, setJournal] = useState(['Début du jeu.']);
  const [errorMessage, setErrorMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [foodWasZero, setFoodWasZero] = useState(false);

  const gridSize = { rows: 5, cols: 5 };

  const generateMap = (rows, cols) => {
    const totalCells = rows * cols;
    const map = [];

    const emptyCount = Math.floor(totalCells * 0.7);
    const forestCount = Math.floor(totalCells * 0.1);
    const mountainCount = Math.floor(totalCells * 0.1);
    const mineCount = totalCells - emptyCount - forestCount - mountainCount;

    const cellTypes = [
      ...Array(emptyCount).fill('empty'),
      ...Array(forestCount).fill('forest'),
      ...Array(mountainCount).fill('mountains'),
      ...Array(mineCount).fill('mine')
    ];

    cellTypes.sort(() => Math.random() - 0.5);

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({ type: cellTypes.pop() });
      }
      map.push(row);
    }

    return map;
  };

  const [mapData, setMapData] = useState(() => generateMap(gridSize.rows, gridSize.cols));

  const handleBuildHouse = (row, col) => {
    if (mapData[row][col].type !== 'empty') return;

    if (resources.wood < 5) {
      setErrorMessage("Pas assez de bois pour construire une cabane !");
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setResources(prev => ({
      ...prev,
      wood: prev.wood - 5,
      humans: {
        current: prev.humans.current + 1,
        max: prev.humans.max + 1
      }
    }));

    const updatedMap = [...mapData];
    updatedMap[row] = [...updatedMap[row]];
    updatedMap[row][col] = { type: 'house' };
    setMapData(updatedMap);

    setJournal(prev => [`Une cabane a été construite en (${row + 1}, ${col + 1})`, ...prev]);
  };

  const handleCheck = (id) => {
    const quete = quetes.find(q => q.id === id);
    if (!quete || quete.terminee) return;

    const reward = quete.recompense || {};

    setResources(prev => {
      const updated = { ...prev };
      if (reward.food) updated.food += reward.food;
      if (reward.wood) updated.wood += reward.wood;
      if (reward.stone) updated.stone += reward.stone;
      return updated;
    });

    setQuetes(prev =>
      prev.map(q => q.id === id ? { ...q, terminee: true } : q)
    );

    setJournal(prev => [`Quête "${quete.titre}" terminée. Récompense reçue.`, ...prev]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setResources(r => {
            const loss = r.humans.current;
            let newFood = Math.max(r.food - loss, 0);

            if (newFood === 0) setFoodWasZero(true);

            return {
              ...r,
              food: newFood
            };
          });

          if (foodWasZero && resources.food === 0) {
            setGameOver(true);
            setJournal(prev => ['Plus de nourriture. Le jeu est terminé.', ...prev]);
          }

          return 10;
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resources.food, foodWasZero]);

  const maxMapSizePx = 600;
  const cellSize = Math.floor(maxMapSizePx / Math.max(gridSize.rows, gridSize.cols));

  return (
    <>
      <ResourceBar resources={resources} />
      <div className="game-container">
        <div className="game-column">
          <QueteListe quetes={quetes} onCheck={handleCheck} />
        </div>

        <div className="game-column map-wrapper">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <Map mapData={mapData} onBuildHouse={handleBuildHouse} cellSize={cellSize} />
        </div>

        <div className="game-column">
          <Journal events={journal} />
        </div>
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>Vous n'avez plus de nourriture, le jeu est terminé.</p>
          <button onClick={() => window.location.reload()}>Recommencer</button>
        </div>
      )}
    </>
  );
};

export default Game;
