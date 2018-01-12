import React from 'react';

export default function FileButton(props) {
  return (
    <div className="button-container">
      <label class="file-item" for="file">Select file to import</label>
      <input class="file-item" name="myFile" type="file" onChange={props.onChange}/>
    </div>
  );
};