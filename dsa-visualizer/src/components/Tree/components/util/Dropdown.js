import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null // Track selected option
    };
  }

  selectItem(selectedOption, id, stateKey) {
    this.setState({ selectedOption }); // Update selected option
    this.props.handleTraversalChange(selectedOption, id, stateKey);
  }

  render() {
    const { options } = this.props;
    const { selectedOption } = this.state;
    return (
      <div className="flex gap-4 mt-50">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => this.selectItem(option.value, option.id, option.key)}
            className={`inline-flex justify-center rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${option.value === selectedOption ? 'ring ring-purple-500' : ''}`}
          >
            {option.value}
            {option.value === selectedOption && <FontAwesomeIcon icon={faCheck} className="ml-2" />}
          </button>
        ))}
      </div>
    );
  }
}
