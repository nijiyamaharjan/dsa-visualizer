import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Button from '../../Sortingatoms/SortingButton';
//import Switch from '../../Sortingatoms/Switch';
import Menu from '../SortingMenu';

const SortingControls = ({
  algorithm,
  onAlgorithmChange,
  onGenerateRandomArray,
  arraySize,
  onArraySizeChange,
  onToggleDarkMode,
  darkMode
}) => {
  return (
    <Fragment>
      <Menu
        placeholder="Sorting Algorithm"
        items={[
          'Bubble Sort',
          'Selection Sort',
          'Insertion Sort',
          'Merge Sort',
          'Quick Sort',
          'Quick Sort 3',
          'Heap Sort',
          'Shell Sort'
        ]}
        selected={algorithm}
        onSelect={onAlgorithmChange}
      />

      <div className="SortingControls__Size">
        <span className="text">Size</span>
        <Menu
          placeholder="Array Size"
          items={['5', '10', '25', '50', '75', '100']}
          selected={String(arraySize)}
          onSelect={onArraySizeChange}
        />
      </div>

      <Button onClick={onGenerateRandomArray}>Randomize</Button>

      {/* <Switch
        label="Dark Mode"
        onSwitch={onToggleDarkMode}
        checked={darkMode}
      /> */}
    </Fragment >
  );
};

SortingControls.propTypes = {
  algorithm: PropTypes.string,
  onAlgorithmChange: PropTypes.func.isRequired,
  onGenerateRandomArray: PropTypes.func.isRequired,
  arraySize: PropTypes.number,
  onArraySizeChange: PropTypes.func.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
  darkMode: PropTypes.bool
};

export default SortingControls;
