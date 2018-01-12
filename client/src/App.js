import React, { Component } from 'react';
import './App.css';
import { parseCsv } from './parseCsv';
import ChartList from './components/ChartList';

class App extends Component {
  constructor() {
    super();
    this.state = {};

    this.readFile = this.readFile.bind(this);
  }

  readFile(event) {
    console.log('handleChange');
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = e => {
      const data = e.target.result;
      console.log(data); 
      this.setState({ data: parseCsv(JSON.parse(JSON.stringify(data))) });
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        this.setState({ data: JSON.parse(JSON.stringify(data)) });
      });
  }

  render() {
    return (
      <div className="main-container">
        <div className="header">
        <h1>MoneyChart</h1>
        <p>See where your money goes and comes from.</p>
      </div>
        <div className="flex-container">
          <div className="chart-list">
            <ChartList data={this.state.data} onChange={this.readFile}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
