import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Button from '../../Sortingatoms/SortingButton';
//importing hamburger and close icon for mobile version
import { MdMenu as Hamburger, MdClose as Close } from 'react-icons/md';

const TopBar = ({ drawerOpen, toggleDrawer, children }) => {
  return (
    <header className="TopBar">
      <div className="TopBar__Row">
        <section className="TopBar__Section">
          {/* for phone version */}
          {/* from sorting.js it intakes the toggle drawer changes the dropdown bar when clicked*/}

          <Button
            icon={drawerOpen ? Close : Hamburger}
            className="TopBar__MenuButton"
            iconClass="TopBar__Icon"
            onClick={toggleDrawer}
          />
          {/* title bar title */}
          <span className="TopBar__Title">Sorting</span>
        </section>
        <section className="TopBar__Section TopBar__Section_align_end">
          {children}
        </section>
      </div>
    </header>
  );
};

export default TopBar;
