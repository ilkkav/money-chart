import 'should';
import moment from 'moment';
import { parseFile } from '../../../parseCsv';
import {
  getRecurringPaymentsChartData,
  getTotalsBySource,
  getMonthlyTotalsChartData,
  getBiggestReceivers,
} from './parseData';
const path = require('path');

describe('test stuff', () => {

  let testData;

  beforeAll(() => {
    let filePath = path.join(__dirname, '../../../data/exampleData.csv');

    return parseFile(filePath)
    .then((result) => {
      testData = result;
    });
  });

  it('parse recurring payments', () => {
    const result = getRecurringPaymentsChartData(testData, 2);
    result.labels.length.should.equal(12);
    result.datasets.length.should.equal(2);
    result.datasets[0].label.should.equal('Spotify');
    result.datasets[0].data.should.deepEqual([ -9, -9, 0, 0, 0, 0, 0, 0, 0, 0, -9, 0 ]);
    result.datasets[1].label.should.equal('The Charity Joint');
    result.datasets[1].data.should.deepEqual([ -5, -5, 0, 0, 0, -5, -5, 0, 0, 0, 0, -5 ]);
  });

  it('get biggest receivers', () => {
    const count = 3;
    const result = getBiggestReceivers(testData, count, -1.0);
    result.labels.should.deepEqual([
      [ 'The Food Store', 218 ],
      [ 'K SUPERMARKET KAMPPI', 99 ],
      [ 'Reiska Testinen', 85 ]
    ]);
    result.labels.length.should.equal(count);
    result.datasets.length.should.equal(1);
    result.datasets[0].data.should.deepEqual([ 218, 99, 85 ]);
  });

  it('get totals by source', () => {
    const data = [
      {
        saajaMaksaja: 'pentti',
        time: 'eilen',
        määrä: '357.5',
      },
      {
        saajaMaksaja: 'sirkka',
        time: 'tänään',
        määrä: '30',
      },
      {
        saajaMaksaja: 'sirkka',
        time: 'eilen',
        määrä: '500.0',
      },
      {
        saajaMaksaja: 'jamppa',
        time: 'eilen',
        määrä: '100.0',
      },
      {
        saajaMaksaja: 'sirkka',
        time: 'eilen',
        määrä: '111.0',
      },
    ];
    const result = getTotalsBySource(data);
    result.length.should.equal(3);
    result.should.deepEqual([
      { source: 'pentti', total: 357.5 },
      { source: 'sirkka', total: 641 },
      { source: 'jamppa', total: 100 }
    ]);
  });

  it('get data by source and by month', () => {

    const { labels, datasets } = getMonthlyTotalsChartData(testData, 'The Wage Company');
    labels.should.deepEqual(moment.monthsShort());
    datasets.length.should.equal(1);
    const { label, data } = datasets[0];
    label.should.equal('The Wage Company');
    labels[5].should.equal('Jun');
    data[5].should.equal(3518);
    labels[7].should.equal('Aug');
    data[7].should.equal(5329);
    data.length.should.equal(12);
    data.every(el => !isNaN(el));
  });
});