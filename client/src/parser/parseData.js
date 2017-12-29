import moment from 'moment';
import _ from 'lodash';

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

export const getTotalsBySource = (data, factorIn) => {
  const factor = factorIn || 1.0;
  const sources = _.uniqBy(data, 'saajaMaksaja').map(el => el.saajaMaksaja);
  return sources.map(source => {
    const total = _.sumBy(fromSource(data, source), el => (parseFloat(el.määrä) * factor));
    return { source, total };
  });
};

export const getBiggestReceivers = (data, count, factor) => {
  const totals = _.sortBy(getTotalsBySource(data), 'total').slice(0, count);
  const color = randomColor();
  return {
    datasets: [{
      data: totals.map(el => (el.total * factor)),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      label: 'total by receiver'
    }],
    labels: totals.map(el => [el.source.slice(0, 20), el.total * factor]),
    options: {
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false,
    },
  };
};

const negativeAmount = el => parseFloat(el.määrä) <= 0;
const descendingByTotal = (l, r) => l.total < r.total;

export const getBiggestReceiversPie = (data, count, factor) => {
  const totalsBySource = getTotalsBySource(data.filter(negativeAmount), factor);
  const grandTotal = _.sumBy(totalsBySource, 'total');
  const nBiggest = totalsBySource.sort(descendingByTotal).slice(0, count);
  const nBiggestTotal = _.sumBy(nBiggest, 'total');
  const grandTotalMinusNBiggest = (grandTotal - nBiggestTotal);

  const result = {
    datasets: [{
      data: nBiggest.map(el => (el.total)).concat(grandTotalMinusNBiggest),
      backgroundColor: colors,
    }],
    labels: nBiggest
      .map(el => `${el.source.slice(0, 20)} ${el.total}`)
      .concat(`Others ${grandTotalMinusNBiggest}`),
    options: {
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false,
    },
  };
  return result;
};

export const getMonthlyTotalsChartData = (data, source) => (
  {
    labels: moment.monthsShort(),
    datasets: [
      totalByMonth(data, source),
    ],
    options: {
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
    },
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

  const color = randomColor();
  return {
    label: source,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 1,
    hoverBackgroundColor: '#3498db',
    hoverBorderColor: 'rgba(255,99,132,1)',
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
    options: {
      responsive: false,
      maintainAspectRatio: false,
    },
  };
};
