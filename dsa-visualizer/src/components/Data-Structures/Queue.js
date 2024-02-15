import React, { Component } from 'react';
import './queue.css'; // Assuming you have a CSS file for queue styling

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      enqueuedItem: "",
      dequeuedItem: ""
    };
  }

  // Enqueue operation
  enqueue = () => {
    const value = document.getElementById("enqueue-item").value;
    if (value) {
      this.setState(prevState => ({
        arr: [...prevState.arr, value],
        enqueuedItem: value
      }));
      document.getElementById("enqueue-item").value = "";
    } else {
      alert("Input cannot be blank");
    }
  };

  // Dequeue operation
  dequeue = () => {
    const { arr } = this.state;
    if (arr.length > 0) {
      const dequeuedItem = arr.shift(); // Update to directly shift and assign
      this.setState({ arr: [...arr], dequeuedItem });
    } else {
      alert("Queue is empty, cannot dequeue.");
    }
  };

  render() {
    const { arr, enqueuedItem, dequeuedItem } = this.state;
    const frontElement = arr.length > 0 ? arr[0] : "";

    return (
      <div className="wrapper">
        <h2>Queue Implementation</h2>
        <div id="item">
          <input type="text" id="enqueue-item" placeholder="Enter value to enqueue" />
          <button onClick={this.enqueue}>ENQUEUE</button>
          <button onClick={this.dequeue}>DEQUEUE</button>
        </div>
        
        <div id="queue">
          {arr.map((item, index) => (
            <div key={index} className={`queue-item ${index === 0 ? "fade-in" : ""}`}>{item}</div>
          ))}
        </div>

        <div id="item">
          <h3>Queue Operations:</h3>
          <p>Elements Enqueued : <span id="enqueued">{enqueuedItem}</span></p>
          <p>Elements Dequeued : <span id="dequeued">{dequeuedItem}</span></p>
          <p>Front element : <span id="front_element">{frontElement}</span></p>
        </div>
      </div>
    );
  }
}

export default Queue;
