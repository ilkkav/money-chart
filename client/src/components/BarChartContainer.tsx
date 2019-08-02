import React from 'react';
import { ChartData, Bar } from 'react-chartjs-2';

type Props = {
  label: string
  data: ChartData<{}>
}

export default function BarChartContainer(props: Props) {
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
