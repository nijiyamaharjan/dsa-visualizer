import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Button from '../../Sortingatoms/SortingButton';
import Menu from '../SortingMenu';
//generates menu for algorithms,size and also updates the render page and values of those selected anf utilizes function from sorting.js
const SortingControls = ({
  algorithm,
  onAlgorithmChange,
  onGenerateRandomArray,
  arraySize,
  onArraySizeChange,

}) => {
  return (
    <Fragment>

      <div className="menu">

        <Menu
          placeholder="Sorting Algorithm"
          items={[
            'Bubble Sort',
            'Selection Sort',
            'Insertion Sort',

          ]}
          selected={algorithm}
          onSelect={onAlgorithmChange}
        />
      </div>


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
