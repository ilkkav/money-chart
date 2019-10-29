import moment from 'moment';
import _ from 'lodash';
import { AccountEvent } from '../AccountEventModel'

const colors = [
  '#F8B195',
  '#F67280',
  '#C06C84',
  '#6C5B7B',
  '#355C7D',
];

const randomColor = () => colors[_.random(0, colors.length -1)];
const fromSource = (data: any, source: string) => data.filter(sourceEquals(source))
const sourceEquals = (source: string) => (el: any) => el.saajaMaksaja.toLowerCase() === source.toLowerCase();

const options = {
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      ticks: {
        stepSize: 1,
        min: 0,
        autoSkip: false,
      },
    }],
  },
};

type SourceTotal = {
  source: string
  total: number
}

const MultiplyAndAcc = (events: AccountEvent[], factor: number): number =>
  events.map(e => parseFloat(e.määrä)).reduce((acc, current) => acc + current * factor, 0)

export const getTotalsBySource = (data: AccountEvent[], factor: number): SourceTotal[] => {
  const bySource = _.toPairs(_.groupBy(data, 'saajaMaksaja'))
  return bySource.map(e => ({source: e[0], total: MultiplyAndAcc(e[1], factor)}))
};

const descByTotal = (l: any, r: any) => r.total - l.total;

export const getNBiggest = (data: AccountEvent[], count: number, factor: number) => {
  const totals = getTotalsBySource(data, factor).sort(descByTotal).slice(0, count);

  const color1 = randomColor();
  const color2 = randomColor();
  return {
    datasets: [{
      data: totals.map(el => el.total),
      backgroundColor: color1,
      hoverBackgroundColor: color2,
      hoverBorderColor: color1,
      borderWidth: 1,
      label: 'total by receiver'
    }],
    labels: totals.map(el => [el.source.slice(0, 20), el.total]),
    options,
  };
};

export const getMonthlyTotalsChartData = (data: AccountEvent[], source: string) => (
  {
    labels: moment.monthsShort(),
    datasets: [
      totalByMonth(data, source),
    ],
    options,
  }
);

const monthEquals = (month: string, el: AccountEvent) => moment(el.maksupaiva, 'DD.MM.YYYY').format('MMM') === month;

const totalByMonth = (data: AccountEvent[], source: string, factor: number = 1.0) => {
  const months = moment.monthsShort();
  const monthlyTotals = months.map(month => {
    const monthData = fromSource(data, source).filter((el: AccountEvent) => monthEquals(month, el));
    return {
      month,
      value: _.sumBy(monthData, (el: AccountEvent) => (parseFloat(el.määrä) * factor)),
    };
  });

  const color1 = randomColor();
  const color2 = randomColor();
  return {
    label: source,
    backgroundColor: color1,
    borderColor: color1,
    borderWidth: 1,
    hoverBackgroundColor: color2,
    hoverBorderColor: color1,
    data: monthlyTotals.map(el => el.value),
  };
};

export const getRecurringPaymentsChartData = (data: AccountEvent[], minTimes: number) => {
  const DELIMITER = '___';
  const getSourceAndAmount = (el: AccountEvent) => `${el.saajaMaksaja}${DELIMITER}${el.määrä}`;

  const countsPerName = _.countBy(data, getSourceAndAmount);
  const recurringPayments = data.filter(el => countsPerName[getSourceAndAmount(el)] > minTimes);
  const uniqueSources = _.uniqBy(recurringPayments, 'saajaMaksaja').map(el => el.saajaMaksaja);

  const datasets = uniqueSources.map(source => totalByMonth(recurringPayments, source, -1.0));
  return {
    labels: moment.monthsShort(),
    datasets,
    options,
  };
};
