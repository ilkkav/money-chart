import moment from 'moment';
import _ from 'lodash';

export const SOURCE_TIME_FORMAT = 'DD.MM.YYYY';

export const getLatestEntry = data => _.maxBy(data, el => moment(el.maksupaiva, SOURCE_TIME_FORMAT));

const RIGHT_INCLUSIVE = '(]';

export const withinLatest = (data, period) => {
  const endTime = moment((getLatestEntry(data).maksupaiva), SOURCE_TIME_FORMAT);
  const startTime = moment(endTime).subtract(...period);
  return data.filter(el => moment(el.maksupaiva, SOURCE_TIME_FORMAT).isBetween(startTime, endTime, 'days', RIGHT_INCLUSIVE));
}