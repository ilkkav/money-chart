import React from 'react';

interface ClickProps {
  onChange: (event: any) => void
}

export default function FileButton(props: ClickProps) {
  return (
    <div className="button-container">
      <label className="file-item" htmlFor="file">Select file to import</label>
      <input className="file-item" name="myFile" type="file" onChange={props.onChange}/>
    </div>
  );
};