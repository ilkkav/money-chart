
import 'should';
import moment from 'moment';
import { parseLocalCsv } from '../../../parseLocalCsv';
import { getLatestEntry, withinLatest, SOURCE_TIME_FORMAT } from './filterData';
const path = require('path');

describe('test filtering', () => {

  let testData: any;

  beforeAll(() => {
    let filePath = path.join(__dirname, '../../../data/exampleData.csv');

    return parseLocalCsv(filePath)
    .then((result: any) => {
      testData = result;
    });
  });

  it('get data by source and by month', () => {
    const result = getLatestEntry(testData);
    result!.saajaMaksaja.should.equal('The Last Day Pub');
    result!.maksupaiva.should.equal('31.12.2016');
  });

  it('filter data by period', () => {
    console.log(withinLatest);
    const result = withinLatest(testData, moment.duration(1, 'month'));
    result.length.should.equal(11);
    result.forEach((el: any) => moment(el.maksupaiva, SOURCE_TIME_FORMAT).isAfter(moment('2016-11-30')).should.be.true());
    result.filter((el: any) => el.saajaMaksaja === 'The November last shop').length.should.equal(0);
    result.filter((el: any) => el.saajaMaksaja === 'The December first store').length.should.equal(1);
  });
});