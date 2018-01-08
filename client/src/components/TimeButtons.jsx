import React from 'react';
import './buttons.css';

export const periods = [
  {
    id: '1',
    period: [1, 'months'],
    text: '1 month',
  },
  {
    id: '2',
    period: [6, 'months'],
    text: '6 months',
  },
  {
    id: '3',
    period: [1, 'year'],
    text: '1 year',
  },
];

const Button = props => (
  <button className="button-item" onClick={() => props.onClick(props.id)}>{props.label}</button>
)

export function TimeButtons(props) {
  return (
    <div className="button-container">
      <p>Select time period:</p>
      {periods.map(el => <Button onClick={props.onClick}  key={el.id} id={el.id} label={el.text} />)}
    </div>
  );
};