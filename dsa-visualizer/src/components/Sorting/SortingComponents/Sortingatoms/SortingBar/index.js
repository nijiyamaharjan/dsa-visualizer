import React from 'react';
import './style.css';

//set Bar classNames for styling through css depending upon state of the bar, creates a bar with <span> tag,gives spacing for bars under process for animation
const Bar = ({
  width,
  height,
  val,
  stateA,
  stateB,
  stateC,
  stateD,
  sorted,
  style
}) => {
  //A,B,C,D,sorted are states of bars depending upon operation on them to imaprt style
  let classNames = 'Bar';
  if (sorted) classNames += ' Bar_sorted';
  if (stateD) classNames += ' Bar_stateD';
  else if (stateC) classNames += ' Bar_stateC';
  else if (stateB) classNames += ' Bar_stateB';
  else if (stateA) classNames += ' Bar_stateA';

  //increaing margine between bars under porcess
  let BarStyle = { ...style, width: `${width}%`, height: `${height}%` };
  if (stateA || stateB || stateC || stateD) {
    BarStyle['marginRight'] = `${0.3 * width}%`;
    BarStyle['marginLeft'] = `${0.3 * width}% `;
  }

  return (
    <div style={BarStyle} className={classNames}>
      <span className="Bar__Text">{val}</span>
    </div>
  );
};

export default Bar;
