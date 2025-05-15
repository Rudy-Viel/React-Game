import React from 'react';
import '../styles/map.css';

import forestIcon from '../assets/icons/tree.svg';
import shedIcon from '../assets/icons/cabin.svg';
import mountainIcon from '../assets/icons/mountain.svg';
import mineIcon from '../assets/icons/mine.svg';

const renderCellContent = (type) => {
  const style = {
    width: '70%',
    height: '70%',
    objectFit: 'contain',
    display: 'block',
  };

  switch (type) {
    case 'forest':
      return <img src={forestIcon} style={style} alt="Forêt" />;
    case 'house':
      return <img src={shedIcon} style={style} alt="Cabane" />;
    case 'mountains':
      return <img src={mountainIcon} style={style} alt="Montagnes" />;
    case 'mine':
      return <img src={mineIcon} style={style} alt="Mine" />;
    default:
      return null;
  }
};

const Map = ({ mapData, onBuildHouse, cellSize }) => {
  return (
    <div className="map-container">
      {mapData.map((row, rowIndex) => (
        <div key={rowIndex} className="map-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`map-cell ${cell.type}`}
              onClick={() => {
                if (cell.type === 'empty') {
                  onBuildHouse(rowIndex, colIndex);
                }
              }}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                cursor: cell.type === 'empty' ? 'pointer' : 'default',
              }}
            >
              {renderCellContent(cell.type)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Map;
