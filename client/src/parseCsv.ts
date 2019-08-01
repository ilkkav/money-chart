import { AccountEvent } from "./AccountEventModel";

const getColumnNames = (headerRow: string, delimiter: string) => headerRow.split(delimiter);

const parseRows = (rawData: string[]) => {
  const columnNames = getColumnNames(rawData[0], '\t');
  return rawData.slice(1).map(row => parseRow(row, columnNames));
};

const toJsonName = (name: string): string => {
  const trimmed = name.replace(' ', '').replace('päivä', 'paiva').replace('määrä', 'maara').replace('ö', 'o').replace('/', '');
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
};

const parseRow = (row: string, columnNames: string[]) => {
  const rawData: any = {};
  const rowValues = row.split('\t');
  columnNames.forEach((name, index) => {
    rawData[toJsonName(name)] = rowValues[index];
  });
  return rawData as AccountEvent;
};

export const parseCsv = (content: string) => {
  //drop the header line that only contains account number
  const rows = content.split('\n').filter(el => el.length > 0).slice(1);
  const result = parseRows(rows);
  return result;
};
