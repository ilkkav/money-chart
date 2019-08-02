import React from 'react';
import { ChartData, Pie } from 'react-chartjs-2';

type Props = {
  label: string
  data: ChartData<{}>
}

export default function PieChartContainer(props: Props) {
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
