import '../styles/queteListe.css';
import humansIcon from '../assets/icons/survivor.svg';
import foodIcon from '../assets/icons/meat.svg';
import woodIcon from '../assets/icons/wood.svg';
import stoneIcon from '../assets/icons/stone.svg';

const iconMap = {
  humans: humansIcon,
  food: foodIcon,
  wood: woodIcon,
  stone: stoneIcon,
};

const QueteListe = ({ quetes, onCheck }) => {
  const nextQueteIndex = quetes.findIndex(q => !q.terminee);
  const lastDoneIndex = [...quetes].reverse().findIndex(q => q.terminee);
  const lastDoneRealIndex = lastDoneIndex !== -1 ? quetes.length - 1 - lastDoneIndex : -1;

  const visibleQuetes = quetes.filter((quete, index) => {
    if (index === nextQueteIndex) return true;
    if (index === lastDoneRealIndex) return true;
    if (index < nextQueteIndex + 5 && !quete.terminee) return true;
    return false;
  });

  const renderRecompenses = (recompense) => {
    return Object.entries(recompense || {}).map(([key, value]) => (
      <div key={key} className="reward-item">
        <img src={iconMap[key]} alt={key} className="reward-icon" />
        <span className="reward-text">+{value}</span>
      </div>
    ));
  };

  return (
    <div className="quete-liste">
      <h2>Quêtes</h2>
      <ul>
        {visibleQuetes.map((quete) => {
          const isNext = quete === quetes[nextQueteIndex];
          return (
            <li
              key={quete.id}
              className={`${quete.terminee ? 'terminee' : ''} ${isNext ? 'highlight' : ''}`}
            >
              <div className="quete-header">
                <input
                  type="checkbox"
                  checked={quete.terminee}
                  onChange={() => onCheck(quete.id)}
                />
                <span className="quete-texte">{quete.titre}</span>
              </div>

              {quete.recompense && (
                <div className="recompense-zone">
                  {renderRecompenses(quete.recompense)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QueteListe;
