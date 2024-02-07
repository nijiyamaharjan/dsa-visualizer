
import React, { Fragment } from 'react';
import './style.css';

import Backdrop from '../../Sortingatoms/SortingBackdrop';

const SortingDrawer = ({ open, children, closeDrawer }) => {
  let className = 'SortingDrawer';
  className += open ? ` SortingDrawer_open` : ` SortingDrawer_closed`;
  return (
    <Fragment>
      <div className={className}>
        <div className="SortingDrawer__Content">{children}</div>
      </div>
      <Backdrop show={open} onClick={closeDrawer} />
    </Fragment>
  );
};

export default SortingDrawer;
