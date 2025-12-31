import React from 'react';
import './Skeleton.css';

function Skeleton({ type }) {
  if (type === 'weather') {
    return (
      <div className="skeleton weather-skeleton">
        <div className="skeleton-title" />
        <div className="skeleton-main" />
        <div className="skeleton-details" />
      </div>
    );
  }
  if (type === 'forecast') {
    return (
      <div className="skeleton forecast-skeleton">
        <div className="skeleton-date" />
        <div className="skeleton-icon" />
        <div className="skeleton-temp" />
        <div className="skeleton-cond" />
      </div>
    );
  }
  return null;
}

export default Skeleton;
