import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Bar from '../../Sortingatoms//SortingBar';
//gets the list of bars in their state, updates visuals for bars for animation 
const getListOfBars = (
  numbers,
  maxNum,
  groupA,
  groupB,
  groupC,
  groupD,
  sortedIndices
) => {
  return numbers.map((num, i) => {
    //setting same width for all bars and height according to the number associated
    let width = 100 / numbers.length;
    let height = (num / maxNum) * 100;
    let stateA = groupA.includes(i);
    let stateB = groupB.includes(i);
    let stateC = groupC.includes(i);
    let stateD = groupD.includes(i);
    let sorted = sortedIndices.includes(i);
    //setting margin for responsiveness when number of bars changed
    let margin =
      i === numbers.length ? '0' : width > 3 ? '0.5rem' : '0.125rem';
    return (
      <Bar
        key={`${i}_${num}`}
        width={width}
        height={height}
        val={width > 4 ? num : null}
        stateA={stateA}
        stateB={stateB}
        stateC={stateC}
        stateD={stateD}
        sorted={sorted}
        style={{ marginRight: `${margin}` }}
      />
    );
  });
};

const SortChart = ({
  numbers,
  maxNum,
  groupA,
  groupB,
  groupC,
  groupD,
  sortedIndices
}) => {
  return (
    //renders list of bars
    <div className="SortChart">
      {getListOfBars(
        numbers,
        maxNum,
        groupA,
        groupB,
        groupC,
        groupD,
        sortedIndices
      )}
    </div>
  );
};

SortChart.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number),
  maxNum: PropTypes.number,
  groupA: PropTypes.arrayOf(PropTypes.number),
  groupB: PropTypes.arrayOf(PropTypes.number),
  groupC: PropTypes.arrayOf(PropTypes.number),
  groupD: PropTypes.arrayOf(PropTypes.number),
  sortedIndices: PropTypes.arrayOf(PropTypes.number)
};

export default SortChart;
