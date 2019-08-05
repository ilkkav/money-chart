import React from 'react';
import './charts.css';
import {
  getMonthlyTotalsChartData,
  getRecurringPaymentsChartData,
  getNBiggest
} from '../parser/parseData';
import { withinLatest, positivePayment, negativePayment } from '../parser/filterData';
import { TimeButtons, periods } from './TimeButtons';
import FileButton from './FileButton';
import ChartContainer from './BarChartContainer';
import { AccountEvent } from '../AccountEventModel';
import { SearchForm } from './SearchForm';

const getPeriodData = (data: AccountEvent[], periodId: number) => {
  return withinLatest(data, periods.find(el => el.id === periodId)!.period);
}

type Props = { data: AccountEvent[], onChange: any }
type State = { activeButton: number, searchText: string | undefined }

export default class ChartList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      activeButton: 1,
      searchText: undefined
    };
    this.setActiveButton = this.setActiveButton.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  setActiveButton(id: number) {
    this.setState({ activeButton: id });
  }

  handleSearchChange(event: any) {
    console.log("in handle:", event.target.value);
  }

  handleSearchSubmit(event: any) {
    //this.setState({searchText: event.target.value})
    console.log("in submit:", event.target.value);
    event.preventDefault();
  }

  render() {
    if (!this.props.data) {
      return <div>Loading..</div>;
    }

    const data = getPeriodData(this.props.data, this.state.activeButton);
    return (
        <div className='chart-list'>
          <FileButton onChange={this.props.onChange}/>
          <TimeButtons onClick={this.setActiveButton} activeId={this.state.activeButton} />
          <SearchForm handleChange={this.handleSearchChange} handlesubmit={this.handleSearchSubmit} value={this.state.searchText}/>
          <hr />
          <ChartContainer label='Biggest receivers' data={ getNBiggest(data.filter(negativePayment), 6, -1.0) } />
          <ChartContainer label='Biggest sources' data={ getNBiggest(data.filter(positivePayment), 5, 1.0) } />
          <ChartContainer label='Wage' data={ getMonthlyTotalsChartData(data, 'The Wage Company') } />
          <ChartContainer label='Recurring payments' data={ getRecurringPaymentsChartData(data, 2) } />
        </div>
      );
  };
};
