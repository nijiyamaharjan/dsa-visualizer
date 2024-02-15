import React, { Component } from 'react';
import './linkedlist.css';

class LinkedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [], // Array to store nodes
            error: null // Error message
        };
    }

    // Function to handle adding a new node
    addNode = () => {
        const newData = parseInt(this.newDataInput.value);
        if (!isNaN(newData)) { // Check if newData is a valid number
            const { nodes } = this.state;
            this.setState({ nodes: [...nodes, newData], error: null });
        } else {
            this.setState({ error: "Please enter a valid number" });
        }
    }

    // Function to handle adding a node at a specific index
    addNodeAtIndex = () => {
        const newData = parseInt(this.newDataInput.value);
        const index = parseInt(this.newIndexInput.value);
        if (!isNaN(newData) && !isNaN(index) && index >= 0 && index <= this.state.nodes.length) {
            const { nodes } = this.state;
            nodes.splice(index, 0, newData); // Insert newData at index
            this.setState({ nodes: nodes, error: null });
            this.newDataInput.value = ''; // Clear input fields
            this.newIndexInput.value = '';
        } else {
            this.setState({ error: "Please enter a valid number for data and index" });
        }
    }

    // Function to handle removing a node by index
    removeNodeAtIndex = (index) => {
        const { nodes } = this.state;
        if (index >= 0 && index < nodes.length) {
            const updatedNodes = nodes.filter((_, i) => i !== index);
            this.setState({ nodes: updatedNodes });
        } else {
            this.setState({ error: "Index out of bounds" });
        }
    }

    render() {
        const { nodes, error } = this.state;

        return (
            <div>
                <header>
                    <div className="header-container">
                        <div id="settings-menu">
                            <i className="fas fa-bars"></i>
                        </div>

                        <div>
                            <h1>Linked <span>List</span> Visualization</h1>
                        </div>

                        <div id="theme-switcher">
                            <i className="fas fa-adjust"></i>
                        </div>
                    </div>
                    <div className="gradient-border"></div>
                </header>
                <main>
                    <section className="list">
                        {nodes.map((data, index) => (
                            <div key={index} className="node">
                                {data}
                                <button onClick={() => this.removeNodeAtIndex(index)}>Remove</button>
                            </div>
                        ))}
                    </section>
                    <section className="errors">
                        <div className="error-message">
                            {error && <p>{error}</p>}
                        </div>
                    </section>
                    <section className="operations">
                        <div className="wrapper">
                            <div>
                                <button className="button" id="add-btn" onClick={this.addNode}>Add</button>
                                <input type="number" ref={input => this.newDataInput = input} placeholder="Data" />
                            </div>
                            <div>
                                <button className="button" id="add-index-btn" onClick={this.addNodeAtIndex}>Add at Index</button>
                                <input type="number" ref={input => this.newIndexInput = input} placeholder="Index" />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

export default LinkedList;
