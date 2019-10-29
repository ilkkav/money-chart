import React from 'react';
import './summary.css';

function SummaryRow(props) {
  return (
    <div className="summary-row">
      <div className="summary-item left" flex="0.4">{props.description}</div>
      <div className="summary-item right" flex="0.6">{props.value}</div>
    </div>
  )
}

export default function SummaryContainer(props) {
  return (
    <div>
      <SummaryRow description='period' value='2017-01-01 to 2017-12-31'/>
      <SummaryRow description='in' value='3000'/>
      <SummaryRow description='out' value='2700'/>
    </div>
  );
};