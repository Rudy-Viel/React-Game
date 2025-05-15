// src/components/ResourceBar.jsx
import '../styles/resourceBar.css';
import humansIcon from '../assets/icons/survivor.svg';
import foodIcon from '../assets/icons/meat.svg';
import woodIcon from '../assets/icons/wood.svg';
import stoneIcon from '../assets/icons/stone.svg';

const ResourceBar = ({ resources, timeLeft }) => {
  const progress = (10 - timeLeft) * 10; // en %

  return (
    <div className="resource-bar">
      <div className="resource-center">
        <div className="resource">
          <img src={humansIcon} alt="Humains" />
          <span>{resources.humans.current} / {resources.humans.max}</span>
        </div>
        <div className="resource">
          <img src={foodIcon} alt="Nourriture" />
          <span>{resources.food}</span>
        </div>
        <div className="resource">
          <img src={woodIcon} alt="Bois" />
          <span>{resources.wood}</span>
        </div>
        <div className="resource">
          <img src={stoneIcon} alt="Pierre" />
          <span>{resources.stone}</span>
        </div>
      </div>

      <div className="timer-container">
        <div className="timer-label">Perte dans {timeLeft}s</div>
        <div className="timer-bar">
          <div
            className="timer-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ResourceBar;
