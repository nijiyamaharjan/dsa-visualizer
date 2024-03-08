import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      selectedOption: null // Track selected option
    };
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  selectItem(selectedOption, id, stateKey) {
    this.setState({ 
      listOpen: false,
      selectedOption // Update selected option
    });
    this.props.handleTraversalChange(selectedOption, id, stateKey);
  }

  render() {
    const { options, title } = this.props;
    const { listOpen, selectedOption } = this.state;
    return (
      <div className="relative inline-block text-left">
        <div>
          <button type="button" onClick={() => this.toggleList()} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" aria-expanded={listOpen} aria-haspopup="true">
            {selectedOption || title} {/* Display selected option or title */}
            <FontAwesomeIcon icon={listOpen ? faAngleUp : faAngleDown} className="-mr-1 h-5 w-5 text-gray-400" />
          </button>
        </div>

        {listOpen && (
          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className="py-1" role="none">
              {options.map(option => (
                <a href="#" key={option.value} onClick={() => this.selectItem(option.value, option.id, option.key)} className={`text-gray-700 block px-4 py-2 text-lg ${option.value === selectedOption ? 'font-semibold' : ''}`} role="menuitem">
                  {option.value}
                  {option.value === selectedOption && <FontAwesomeIcon icon={faCheck} className="float-right" />}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
