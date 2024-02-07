import React, { Component, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './home.css';
import { Helmet } from 'react-helmet';

export class Home extends Component {
    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    render() {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gradient-container">
                <h1 className="text-4xl font-bold text-gray-700 mb-40 mt-10">
                    DATA STRUCTURES AND ALGORITHMS VISUALIZER
                </h1>
                <div className="flex  w-full h-full items-center justify-center">
                    <div>
                        <Helmet>
                            <title>Visualizer</title>
                        </Helmet>
                        <div className="flex mb-4">
                            {this.renderCard('DataStructures', 'Stack, Queue, Linked List', '/DataStructures')}
                            {this.renderCard('Sorting', 'Bubble Sort, Insertion Sort, Quick Sort', '/Sorting')}
                            {this.renderCard('Searching', 'Linear Search, Binary Search', '/Searching')}
                            {this.renderCard('Graph', 'Dijkstra, Prim, BFS, DFS', '/GraphAlgorithm')}
                            {this.renderCard('Tree', 'Binary Tree Traversal', '/Tree')}
                        </div>
                    </div>
                </div>
                <div className="text-center py-7">
                    <p className="text-gray-700">
                        The application is aimed to help the users better understand various data structures and algorithms.
                    </p>
                </div>
            </div>
        );
    }

    renderCard(title, description, link) {
        return (
            <div className="flex h-screen card-container">
                <div className="m-10">
                    <div className="w-full max-w-md bg-white bg-opacity-50 rounded-md shadow-xl flex flex-col items-center card-wrapper">
                        <h3 className="glassmorphism-title p-10">
                            {title}
                        </h3>
                        <p style={{ fontFamily: 'Georgia' }} className="glassmorphism-text p-10">
                            {description}
                        </p>
                        <NavLink
                            to={link}
                            className="p-4 text-white bg-gray-700 hover:bg-black focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                            {title}
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;
