import React from 'react';
import moment from 'moment';
import './charts.css';
import {
  getMonthlyTotalsChartData,
  getRecurringPaymentsChartData,
  getBiggestReceivers,
  getBiggestReceiversPie,
} from '../parser/parseData';
import { TimeButtons } from './TimeButtons';
import ChartContainer from './ChartContainer';
import PieChartContainer from './PieChartContainer';


const filterByMonth = (data, month) => data.filter(el => moment(el.maksupaiva, 'DD.MM.YYYY').format('MMM') === month);

export default class ChartList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { activeButton: undefined };
    this.setActiveButton = this.setActiveButton.bind(this);
  }

  setActiveButton(id) {
    this.setState({ activeButton: id });
  }

  render() {
    if (!this.props.data) {
      return <div>Loading..</div>;
    }
    const data = this.props.data;
    return (
        <div>
          <TimeButtons onClick={this.setActiveButton} />
          <ChartContainer label='Wage' data={ getMonthlyTotalsChartData(data, 'The Wage Company') } />
          <ChartContainer label='Biggest receivers/last month' data={ getBiggestReceivers(filterByMonth(data, 'Dec'), 5, -1.0) } />
          <PieChartContainer label='All receivers/last month' data={ getBiggestReceiversPie(filterByMonth(data, 'Dec'), 5, -1.0) } />
          <ChartContainer label='Biggest receivers/year' data={ getBiggestReceivers(data, 5, -1.0) } />
          <ChartContainer label='Recurring payments' data={ getRecurringPaymentsChartData(data, 2) } />
        </div>
      );
  };
};
