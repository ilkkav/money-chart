import React, { Component } from 'react';
import './App.css';
import { parseCsv } from './parseCsv';
import ChartList from './components/ChartList';

class App extends Component<{}, {data: any} > {
  constructor(props: any) {
    console.log("konstruktori")
    super(props);
    this.state = { data: undefined };

    this.readFile = this.readFile.bind(this);
  }

  readFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = e => {
      const data = reader.result;
      console.log(data);
      this.setState({ data: parseCsv(JSON.parse(JSON.stringify(data))) });
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(dataIn => {
        this.setState({ data: JSON.parse(JSON.stringify(dataIn)) });
      });
  }

  render() {
    console.log(this.state)
    return (
      <div className="main-container">
        <div className="header">
          <h1>MoneyChart</h1>
          <p>See where your money goes and comes from.</p>
        </div>
        <div className="flex-container">
          <div className="chart-list">
          {this.state.data ?
            <ChartList data={this.state.data} onChange={this.readFile}/>:
            <div/>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
