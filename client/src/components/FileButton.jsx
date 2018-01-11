import React from 'react';

export default function FileButton(props) {
  return (
    <div className="button-container">
      <input name="myFile" type="file" onChange={props.onChange}/>
    </div>
  );
};