import React from 'react';
import './buttons.css';

const SearchResult = props => (
  <div>
    <p>Result:</p>
    {props.results.map(el => (<p>el</p>)}
  </div>
)

class SourceFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text, value, onSearch } = this.props;

    return (
      <div className="button-container">
        <input
          className="filter"
          placeholder={text}
          defaultValue={value}
          onChange={(event) => {
            const searchText = event.target.value;
            clearTimeout(this.state.timeout);
            const timeout = setTimeout(() => {
              onSearch(searchText);
            }, 500);  
            this.setState({ timeout });
          }}
        />
      </div>
    );
  }
}

export default SourceFilter;