import React, { Component } from 'react';
import './stack.css';

class Stack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      pushedItem: "",
      poppedItem: ""
    };
  }

  // Push operation
  push = () => {
    const value = document.getElementById("push-item").value;
    if (value) {
      this.setState(prevState => ({
        arr: [value, ...prevState.arr],
        pushedItem: value
      }));
      document.getElementById("push-item").value = "";
    } else {
      alert("Input cannot be blank");
    }
  };

  // Pop operation
  pop = () => {
    const { arr } = this.state;
    if (arr.length > 0) {
      const poppedItem = arr[0];
      arr.shift();
      this.setState({ arr: [...arr], poppedItem });
    } else {
      alert("Stack is empty, cannot pop.");
    }
  };

  render() {
    const { arr, pushedItem, poppedItem } = this.state;

    return (
      <div className="wrapper">
        <h2>Stack Implementation</h2>
        <div id="item">
          <input type="text" id="push-item" placeholder="Enter value to push" />
          <button onClick={this.push}>PUSH</button>
          <button onClick={this.pop}>POP</button>
        </div>
        
        <div id="stack">
          {arr.map((item, index) => (
            <div key={index} className={`stack-item ${index === 0 ? "fade-in" : ""}`}>{item}</div>
          ))}
        </div>

        <div id="item">
          <h3>Stack Operations:</h3>
          <p>Elements Pushed : <span id="pushed">{pushedItem}</span></p>
          <p>Elements Popped : <span id="popped">{poppedItem}</span></p>
          <p>Top element : <span id="top_element">{arr.length > 0 ? arr[0] : ""}</span></p>
        </div>
      </div>
    );
  }
}

export default Stack;
