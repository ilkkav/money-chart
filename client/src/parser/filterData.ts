import moment from 'moment';
import _ from 'lodash';
import { AccountEvent } from '../AccountEventModel';

export const SOURCE_TIME_FORMAT = 'DD.MM.YYYY';

export const getLatestEntry = (data: AccountEvent[]) => _.maxBy(data, el => moment(el.maksupaiva, SOURCE_TIME_FORMAT));

export const positivePayment = (el: AccountEvent) => parseFloat(el.määrä) >= 0;
export const negativePayment = (el: AccountEvent) => parseFloat(el.määrä) <= 0;

const RIGHT_INCLUSIVE = '(]';

export const withinLatest = (data: AccountEvent[], period: moment.Duration): AccountEvent[] => {
  const latestEntry = getLatestEntry(data)
  if (!latestEntry) {
    return []
  }

  const endTime = moment(latestEntry.maksupaiva, SOURCE_TIME_FORMAT);
  const startTime = moment(endTime).subtract(period);
  return data.filter(el => moment(el.maksupaiva, SOURCE_TIME_FORMAT).isBetween(startTime, endTime, 'days', RIGHT_INCLUSIVE));
}