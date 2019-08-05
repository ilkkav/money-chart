import React from 'react';

interface PropsFunction {
  handleChange: (e: any) => void
  handleSubmit: (e: any) => void
  value: string
}

export function SearchForm(props: any) {
  return (
    <form className='button-container' onSubmit={props.handleSubmit}>
      <label>
        Search:
        <input className='search-item' type="text" value={props.value} onChange={props.handleChange} />
      </label>
    </form>
  );
}