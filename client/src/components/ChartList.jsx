import React from 'react';
import './charts.css';
import {
  getMonthlyTotalsChartData,
  getRecurringPaymentsChartData,
  getBiggestReceivers,
  getBiggestReceiversPie,
} from '../parser/parseData';
import { withinLatest } from '../parser/filterData';
import { TimeButtons, periods } from './TimeButtons';
import ChartContainer from './ChartContainer';
import PieChartContainer from './PieChartContainer';

const getPeriodData = (data, periodId) => {
  console.log(periods.find(el => el.id === periodId));
  return withinLatest(data, periods.find(el => el.id === periodId).period);
}

export default class ChartList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { activeButton: 1 };
    this.setActiveButton = this.setActiveButton.bind(this);
  }

  setActiveButton(id) {
    this.setState({ activeButton: id });
  }

  render() {
    if (!this.props.data) {
      return <div>Loading..</div>;
    }

    const data = getPeriodData(this.props.data, this.state.activeButton);
    console.log(data);
    return (
        <div>
          <TimeButtons onClick={this.setActiveButton} />
          <ChartContainer label='Biggest receivers' data={ getBiggestReceivers(data, 5, -1.0) } />
          <PieChartContainer label='All receivers' data={ getBiggestReceiversPie(data, 5, -1.0) } />
          <ChartContainer label='Wage' data={ getMonthlyTotalsChartData(data, 'The Wage Company') } />
          <ChartContainer label='Recurring payments' data={ getRecurringPaymentsChartData(data, 2) } />
        </div>
      );
  };
};
