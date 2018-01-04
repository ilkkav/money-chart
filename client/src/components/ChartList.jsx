import React from 'react';
import moment from 'moment';
import './charts.css';
import {
  getMonthlyTotalsChartData,
  getRecurringPaymentsChartData,
  getBiggestReceivers,
  getBiggestReceiversPie,
} from '../parser/parseData';
import ChartContainer from './ChartContainer';
import PieChartContainer from './PieChartContainer';

const filterByMonth = (data, month) => data.filter(el => moment(el.maksupaiva, 'DD.MM.YYYY').format('MMM') === month);

export default function ChartList(props) {
  if (!props.data) {
    return <div>Loading..</div>;
  }

  return (
      <div>
        <ChartContainer label='Wage' data={ getMonthlyTotalsChartData(props.data, 'The Wage Company') } />
        <ChartContainer label='Biggest receivers/last month' data={ getBiggestReceivers(filterByMonth(props.data, 'Dec'), 5, -1.0) } />
        <PieChartContainer label='All receivers/last month' data={ getBiggestReceiversPie(filterByMonth(props.data, 'Dec'), 5, -1.0) } />
        <ChartContainer label='Biggest receivers/year' data={ getBiggestReceivers(props.data, 5, -1.0) } />
        <ChartContainer label='Recurring payments' data={ getRecurringPaymentsChartData(props.data, 2) } />
      </div>
    );
}