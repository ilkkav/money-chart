import React from 'react';
const rc = require('react-chartjs-2');
const Bar = rc.Bar;

export default function ChartContainer(props) {
  return (
      <div className="chart-container">
        <div className="chart-label">
          { props.label }
        </div>
        <div>
          <Bar data={ props.data } />
        </div>
      </div>
    );
}
