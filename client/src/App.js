import React, { Component } from 'react';
import './App.css';
import ChartList from './components/ChartList';

class App extends Component {
  state = {};

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
            <ChartList data={this.state.data}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
