
const getColumnNames = (headerRow, delimiter) => headerRow.split(delimiter);

const parseRows = (rawData) => {
  const columnNames = getColumnNames(rawData[0], '\t');
  return rawData.slice(1).map(row => parseRow(row, columnNames));
};

const toJsonName = (name) => {
  const trimmed = name.replace(' ', '').replace('päivä', 'paiva').replace('määrä', 'maara').replace('ö', 'o').replace('/', '');
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
};

const parseRow = (row, columnNames) => {
  const rawData = {};
  const rowValues = row.split('\t');
  columnNames.forEach((name, index) => {
    rawData[toJsonName(name)] = rowValues[index];
  });
  return rawData;
};

const parseCsv = (content) => {
  //drop the header line that only contains account number
  const rows = content.split('\n').filter(el => el.length > 0).slice(1);
  const result = parseRows(rows);
  return result;
};

module.exports = {parseCsv};