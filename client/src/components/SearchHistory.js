import React from 'react';
import './SearchHistory.css';

function SearchHistory({ history, onSelect }) {
  if (!history.length) return null;
  return (
    <div className="search-history">
      <div className="history-title">Recent Searches</div>
      <ul>
        {history.map((item, idx) => (
          <li key={item.city + idx} onClick={() => onSelect(item.city)}>
            <span className="city">{item.city}</span>
            <span className="timestamp">{new Date(item.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
