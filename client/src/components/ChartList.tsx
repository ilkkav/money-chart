import React, { useState } from 'react';
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

const getPeriodData = (data: AccountEvent[], periodId: number) => {
  return withinLatest(data, periods.find(el => el.id === periodId)!.period);
}

type Props = { data: AccountEvent[], onChange: any }
type State = { activeButton: number }

export default function ChartList(props: Props): JSX.Element {

  const [activeButton, setActiveButton] = useState<number>(1)

  if (!props.data) {
    return <div>Loading..</div>;
  }

  const data = getPeriodData(props.data, activeButton);
  return (
    <div>
      <FileButton onChange={props.onChange} />
      <TimeButtons onClick={setActiveButton} activeId={activeButton} />
      <hr />
      <ChartContainer label='Biggest receivers' data={getNBiggest(data.filter(negativePayment), 6, -1.0)} />
      <ChartContainer label='Biggest sources' data={getNBiggest(data.filter(positivePayment), 5, 1.0)} />
      <ChartContainer label='Wage' data={getMonthlyTotalsChartData(data, 'The Wage Company')} />
      <ChartContainer label='Recurring payments' data={getRecurringPaymentsChartData(data, 2)} />
    </div>
  );
};
