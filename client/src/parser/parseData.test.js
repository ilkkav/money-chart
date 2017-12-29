import 'should';
import moment from 'moment';
import { parseFile } from '../../server/data/parseCsv';
import { getRecurringPaymentsChartData, getTotalsBySource, getMonthlyTotalsChartData } from '../parser/parseData';
const path = require('path');

describe('test stuff', () => {

  let testData;

  beforeAll(() => {
    let filePath = path.join(__dirname, '../../server/data/exampleData.csv');

    return parseFile(filePath)
    .then((result) => {
      testData = result;
    });
  });

  it.only('parse recurring payments', () => {
    const result = getRecurringPaymentsChartData(testData, 2);
    console.log(result);
    result.labels.length.should.equal(12);
    result.datasets.length.should.equal(2);
    result.datasets[0].label.should.equal('Spotify');
    result.datasets[0].data.should.deepEqual([ -9, -9, 0, 0, 0, 0, 0, 0, 0, 0, -9, 0 ]);
    result.datasets[1].label.should.equal('SUOMEN UNICEF RY');
    result.datasets[1].data.should.deepEqual([ -5, 0, 0, 0, 0, -5, 0, 0, 0, 0, 0, -5 ]);

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