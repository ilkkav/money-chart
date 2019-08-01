import React from 'react';
import './charts.css';
import {
  getMonthlyTotalsChartData,
  getRecurringPaymentsChartData,
  getNBiggest,
  getBiggestReceiversPie,
} from '../parser/parseData';
import { withinLatest, positivePayment, negativePayment } from '../parser/filterData';
import { TimeButtons, periods } from './TimeButtons';
import FileButton from './FileButton';
import ChartContainer from './ChartContainer';
import PieChartContainer from './PieChartContainer';

const getPeriodData = (data, periodId) => {
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
    return (
        <div>
          <FileButton onChange={this.props.onChange}/>
          <TimeButtons onClick={this.setActiveButton} activeId={this.state.activeButton} />
          <hr />
          <ChartContainer label='Biggest receivers' data={ getNBiggest(data.filter(negativePayment), 5, -1.0) } />
          <ChartContainer label='Biggest sources' data={ getNBiggest(data.filter(positivePayment), 5, 1.0) } />
          <PieChartContainer label='All receivers' data={ getBiggestReceiversPie(data, 5, -1.0) } />
          <ChartContainer label='Wage' data={ getMonthlyTotalsChartData(data, 'The Wage Company') } />
          <ChartContainer label='Recurring payments' data={ getRecurringPaymentsChartData(data, 2) } />
        </div>
      );
  };
};
