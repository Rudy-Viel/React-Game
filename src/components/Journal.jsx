import React from 'react';
import '../styles/journal.css';


const Journal = ({ events }) => {
  return (
    <div className="journal">
      <h2>Journal</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
};

export default Journal;
