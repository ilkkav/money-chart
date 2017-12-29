import React from 'react';
const rc = require('react-chartjs-2');
const Pie = rc.Pie;

export default function PieChartContainer(props) {
  return (
    <div className="chart-container">
      <div className="chart-label">
        { props.label }
      </div>
      <div>
        <Pie data={ props.data } />
      </div>
    </div>
  );
}
