import React from 'react';
import moment from 'moment';
import './buttons.css';

interface Period {
  id: number,
  period: moment.Duration,
  text: string
}

export const periods: Period[] = [
  {
    id: 1,
    period: moment.duration(1, 'months'),
    text: '1 month',
  },
  {
    id: 2,
    period: moment.duration(6, 'months'),
    text: '6 months',
  },
  {
    id: 3,
    period: moment.duration(1, 'year'),
    text: '1 year',
  },
];

const buttonClass = (active: boolean): string => `button-item${active? ' active' : ''}`;

type ButtonProps = {
  onClick: (id: number) => void
  active: boolean
  label: string
  id: number
}

const Button = (props: ButtonProps) => (
  <button className={buttonClass(props.active)}  onClick={() => props.onClick(props.id)}>{props.label}</button>
)

type Props = {
  activeId: number
  onClick: (id: number) => void
}

export function TimeButtons(props: Props) {
  return (
    <div className="button-container">
      <p>Select time period:</p>
      {periods.map((el: Period) => <Button onClick={props.onClick} active={el.id===props.activeId} key={el.id} id={el.id} label={el.text} />)}
    </div>
  );
};