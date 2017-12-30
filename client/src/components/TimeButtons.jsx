import React from 'react';
import './buttons.css';

export default function TimeButtons(props) {
  return (
    <div class="button-container">
      <p>Select time period:</p>
      <button class="button-item">1 month</button>
      <button class="button-item">6 months</button>
      <button class="button-item">1 year</button>
    </div>
  );
};