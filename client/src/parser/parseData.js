import moment from 'moment';
import _ from 'lodash';
import { negativePayment } from './filterData';

const colors = [
  '#F8B195',
  '#F67280',
  '#C06C84',
  '#6C5B7B',
  '#355C7D',
];

const randomColor = () => colors[_.random(0, colors.length -1)];
const fromSource = (data, source) => data.filter(sourceEquals(source))
const sourceEquals = source => el => el.saajaMaksaja.toLowerCase() === source.toLowerCase();

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

export const getTotalsBySource = (data, factorIn) => {
  const factor = factorIn || 1.0;
  const sources = _.uniqBy(data, 'saajaMaksaja').map(el => el.saajaMaksaja);
  return sources.map(source => {
    const total = _.sumBy(fromSource(data, source), el => (parseFloat(el.määrä) * factor));
    return { source, total };
  });
};

const descByTotal = (l, r) => r.total - l.total;

export const getNBiggest = (data, count, factor) => {
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

export const getBiggestReceiversPie = (data, count, factor) => {
  const totalsBySource = getTotalsBySource(data.filter(negativePayment), factor);
  const grandTotal = _.sumBy(totalsBySource, 'total');
  const nBiggest = totalsBySource.sort(descByTotal).slice(0, count);
  const nBiggestTotal = _.sumBy(nBiggest, 'total');
  const grandTotalMinusNBiggest = (grandTotal - nBiggestTotal);

  return {
    datasets: [{
      data: nBiggest.map(el => (el.total)).concat(grandTotalMinusNBiggest),
      backgroundColor: colors,
    }],
    labels: nBiggest
      .map(el => `${el.source.slice(0, 20)} ${el.total}`)
      .concat(`Others ${grandTotalMinusNBiggest}`),
    options,
  };
};

export const getMonthlyTotalsChartData = (data, source) => (
  {
    labels: moment.monthsShort(),
    datasets: [
      totalByMonth(data, source),
    ],
    options,
  }
);

const monthEquals = (month, el) => moment(el.maksupaiva, 'DD.MM.YYYY').format('MMM') === month;

const totalByMonth = (data, source) => {
  const months = moment.monthsShort();
  const monthlyTotals = months.map(month => {
    const monthData = fromSource(data, source).filter(el => monthEquals(month, el));
    return {
      month,
      value: _.sumBy(monthData, el => parseFloat(el.määrä)),
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

export const getRecurringPaymentsChartData = (data, minTimes) => {
  const DELIMITER = '___';
  const getSourceAndAmount = el => `${el.saajaMaksaja}${DELIMITER}${el.määrä}`;

  const countsPerName = _.countBy(data, getSourceAndAmount);
  const recurringPayments = data.filter(el => countsPerName[getSourceAndAmount(el)] > minTimes);
  const uniqueSources = _.uniqBy(recurringPayments, 'saajaMaksaja').map(el => el.saajaMaksaja);

  const datasets = uniqueSources.map(source => totalByMonth(recurringPayments, source));
  return {
    labels: moment.monthsShort(),
    datasets,
    options,
  };
};
