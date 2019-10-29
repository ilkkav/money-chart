import React, { useState, useEffect } from 'react';
import './App.css';
import { parseCsv } from './parseCsv';
import ChartList from './components/ChartList';
import { AccountEvent } from './AccountEventModel';

function App(): JSX.Element {
  const [data, setData] = useState<AccountEvent[]>([])

  const readFile = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = _ => {
      const data = reader.result;
      setData(parseCsv(JSON.parse(JSON.stringify(data))));
    };
  }

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(dataIn => {
        setData(JSON.parse(JSON.stringify(dataIn)));
      });
  }, []);

  return (
    <div className="main-container">
      <div className="header">
        <h1>MoneyChart</h1>
        <p>See where your money goes and comes from.</p>
      </div>
      <div className="flex-container">
        <div className="chart-list">
          {data.length > 0 ?
            <ChartList data={data} onChange={readFile} /> :
            <div />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
