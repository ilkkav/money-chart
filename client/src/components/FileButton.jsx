import React from 'react';

export default function FileButton(props) {
  return (
    <div className="button-container">
      <label className="file-item" htmlFor="file">Select file to import</label>
      <input className="file-item" name="myFile" type="file" onChange={props.onChange}/>
    </div>
  );
};