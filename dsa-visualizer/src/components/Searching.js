import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './searching.css'

class Searching extends Component {

    constructor(props) {
        super(props);
        this.state = {
          randomArray: [],
          randomSortedArray: [],
          searchType: 'linear',
          elementToSearch: '',
          boxesContent: []
        };

        this.binarySearchRef = React.createRef();
        this.linearSearchRef = React.createRef();
        this.searchRef = React.createRef();
        this.generateArrayRef = React.createRef();
      }
    
      successColor = "#32E0C4";
      failureColor = "#FB3640";
      
    
      
  generateArray = () => {
    const resultArray = [];
    for (let i = 0; i < 10; i++) {
      const value = Math.floor(Math.random() * 99);
      resultArray.push(value);
    }
    return resultArray;
  };

  insertRandomArray = () => {
    const { searchType } = this.state;
    const randomArray = this.generateArray();
    const randomSortedArray = [...randomArray].sort((a, b) => a - b);
  
    const boxesContent = searchType === "linear" ? randomArray : randomSortedArray;
    this.setState({ randomArray, randomSortedArray, boxesContent });
  };

  disable = () => {
    if (this.binarySearchRef.current && this.linearSearchRef.current && this.searchRef.current && this.generateArrayRef.current) {
        this.binarySearchRef.current.setAttribute("disabled", true);
        this.linearSearchRef.current.setAttribute("disabled", true);
        this.searchRef.current.setAttribute("disabled", true);
        this.generateArrayRef.current.setAttribute("disabled", true);
    } else {
        setTimeout(this.disable, 100); // Retry after 100 milliseconds
    }
  };

  handleGenerateArray = () => {
    this.insertRandomArray();
  };

  handleSearch = () => {
    const { elementToSearch, randomArray, randomSortedArray, searchType } = this.state;
    const searchValue = parseInt(elementToSearch);
    if (!isNaN(searchValue)) {
      this.disable();
      if (searchType === "linear") {
        this.linearSearch(randomArray, searchValue);
      } else if (searchType === "binary") {
        this.binarySearch(randomSortedArray, searchValue, 0, randomSortedArray.length - 1);
      }
    } else {
      alert("Please enter a valid number to search.");
    }
  };

  handleLinearSearch = () => {
    this.setState({ searchType: "linear" });
  };

  handleBinarySearch = () => {
    this.setState({ searchType: "binary" }, () => {
      this.insertRandomArray();
    });
  };
  linearSearch = (arr, value) => {
    let counter = 0;
    const timer = setInterval(() => {
      let box = `box-wrapper-${counter}`;
  console.log(arr[counter]);
      if (counter !== 0) {
        // hiding arrow
        // Example: document.getElementById(box).style.display = "none";
      }
  
      if (counter === arr.length) {
        alert("Element Not Found");
        clearInterval(timer);
      } else {
        // displaying arrow
        // Example: document.getElementById(box).style.display = "block";
        var innerTimer = setTimeout(() => {
          // Example: document.getElementById(box).style.backgroundColor = this.failureColor;
        }, 100);
      }
  
      if (arr[counter] === value) {
        clearInterval(innerTimer);
        alert("Element Found At Index " + counter);
        clearInterval(timer);
      }
      counter++;
    }, 100);
  };

  binarySearch = (arr, x, start, end) => {
    
    if (start > end) {
      alert("Element not Found");
      return false;
    }
    else{
        var innerTimer = setTimeout(() => {
            // Example: document.getElementById(box).style.backgroundColor = this.failureColor;
          }, 500);
    }
  
    let mid = Math.floor((start + end) / 2);
    console.log(arr[mid]);
    let previousMid = mid;
    let box = `box-wrapper-${mid}`;
  
    // displaying arrow and color
    // Example: document.getElementById(box).style.display = "block";
    // Example: setTimeout(() => { document.getElementById(box).style.backgroundColor = this.failureColor; }, 500);
  
    if (arr[mid] === x) {
      // Example: document.getElementById(box).style.backgroundColor = this.successColor;
      alert("Element Found At Index " + mid);
      return true;
    }
  
    if (arr[mid] > x) {
      // Example: document.getElementById(box).style.display = "none";
      return this.binarySearch(arr, x, start, mid - 1);
    } else {
      // Example: document.getElementById(box).style.display = "none";
      return this.binarySearch(arr, x, mid + 1, end);
    }
  };
  render() {
    const { boxesContent } = this.state;
    return (
      <div id="root">
        <div className="outer-wrapper">
          {/* Nav bar section */}
          <nav className="navbar container shadow">
            {/* Navbar left section */}
            <div className="nav-left-section">
              <h2><a href="">Searching</a></h2>
            </div>
            {/* Navbar middle section */}
            <div className="nav-middle-section">
              <div className="linear-wrapper search-btn">
                <button className="linear-btn btn" onClick={this.handleLinearSearch}>
                  Linear Search
                </button>
              </div>
              <div className="binary-wrapper search-btn">
                <button className="binary-btn btn" onClick={this.handleBinarySearch}>
                  Binary Search
                </button>
              </div>
            </div>
            {/* Navbar right section */}
            <div className="nav-right-section">
              <h2><a href="">Visualizer</a></h2>
            </div>
          </nav>

          {/* Main body section */}
          <div className="main">
            <div className="main-wrapper shadow">
              {/* Searching visual section */}
              <div className="search-window">
                <div className="box-container">
                  {boxesContent.map((value, index) => (
                    <div className="box" id={`box-wrapper-${index}`} key={index}>
                      <div className="box-item-text" id={`box-${index}`}>
                        {value}
                      </div>
                      <div className="box-item-icon">
                        <i className="fas fa-long-arrow-alt-up"></i>
                      </div>
                    </div>
                  ))}
                  {/* Search option section */}
                  <div className="search-options">
                    <div className="search-options-wrapper">
                      {/* For generating new array */}
                      <div className="generate-array">
                        <button className="new-array btn shadow" onClick={this.handleGenerateArray}>
                          New Array
                        </button>
                      </div>
                      {/* For element to be searched */}
                      <div className="search-element">
                      <input
                        type="text"
                        placeholder="Enter element to search"
                        id="valueForSearch"
                        value={this.state.elementToSearch}
                        onChange={(e) => this.setState({ elementToSearch: e.target.value })}
                        required="required"
                        autoComplete="off"
                        style={{ color: 'blue' }}
                        />
                      </div>
                      {/* For search to start */}
                      <div className="search-wrapper">
                        <button className="search btn shadow" onClick={this.handleSearch}>
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Searching;
