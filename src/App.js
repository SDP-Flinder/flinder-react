import React from 'react';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import './App.css';

function like() {
  // adds current flat shown into liked list (updates backend list
  // and reveals the next available flat)
  // eslint-disable-next-line no-alert
  alert('I like this flat!');
}

function dislike() {
  // skips current flat and move on to the next flat card (updates backend list
  // and reveals the next available flat)
  // eslint-disable-next-line no-alert
  alert('I dislike this flat!');
}

export default function App() {
  return (
    <div>
      <CheckCircleOutlineOutlinedIcon style={{ fontSize: 60 }} type="button" onClick={like} />
      <CancelOutlinedIcon style={{ fontSize: 60 }} type="button" onClick={dislike} />
    </div>
  );
}
